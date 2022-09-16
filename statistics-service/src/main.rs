#[macro_use] 
extern crate rocket;
extern crate reqwest;

mod service;

use rocket::{routes, Rocket, Build};
use rocket::serde::json::Json;
use service::LogCreateRequest;
use service::Log;
use service::StatsCount;
use std::{thread};
use service::Product;

#[get("/")]
fn get_all() -> Json<Vec<Log>> {
    thread::spawn(move || {
        let logs = service::get_all();
        Json(logs.unwrap())
    }).join().unwrap()
}

#[get("/statistics-for-all/<logtype>")]
fn get_statistics_for_all(logtype: String) -> Json<Vec<StatsCount>> {
    thread::spawn(move || {
        let counts = service::get_count_for_type_product(logtype);
        Json(counts.unwrap())
    }).join().unwrap()
}

#[get("/statistics-for-all-interval/<logtype>/<t1>/<t2>")]
fn get_statistics_for_all_interval(logtype: String, t1: String, t2: String) -> Json<Vec<StatsCount>> {
    thread::spawn(move || {
        let counts = service::get_count_for_type_product_interval(logtype, t1, t2);
        Json(counts.unwrap())
    }).join().unwrap()
}

#[post("/visit", format = "json", data = "<req>")]
fn add_visit(req: Json<LogCreateRequest>) -> Json<String> {
    thread::spawn(move || {
        let resp = service::create_log(req.into_inner(), "VISIT".to_string());
        Json(resp.unwrap())
    }).join().unwrap()
}

#[get("/subscriptions")]
async fn get_sub_count_for_products() -> Json<Vec<(Product, i32)>> {
    let sub_counts = service::get_sub_count_for_products();
    Json(sub_counts.await.unwrap())
}

#[get("/comments")]
async fn get_comment_count_for_products() -> Json<Vec<(Product, i32)>> {
    let comment_counts = service::get_comment_count_for_products();
    Json(comment_counts.await.unwrap())
}

#[get("/ratings")]
async fn get_rating_for_products() -> Json<Vec<(Product, f32)>> {
    let ratings = service::get_rating_for_products();
    Json(ratings.await.unwrap())
}

#[launch]
fn rocket() -> Rocket<Build> {
    thread::spawn(|| {
        match service::seed_db() {
            Ok(()) => println!("DB is initialized successfuly"),
            Err(error) => println!("There was an error: {:?}", error),
        }
    }).join().expect("Thread panicked");

    rocket::build()
        .mount("/api/statistics", 
            routes![
                get_all, 
                // get_all_visits, get_all_comments, get_all_saves, 
                // get_product_visits, get_product_comments, get_product_saves,
                add_visit, 
                // add_comment, add_save,
                get_statistics_for_all, get_statistics_for_all_interval,
                get_sub_count_for_products, get_comment_count_for_products, get_rating_for_products
            ])
}