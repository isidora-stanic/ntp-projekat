#[macro_use] 
extern crate rocket;

mod service;

use rocket::{routes, Rocket, Build};
use rocket::serde::json::Json;
use service::ReviewCreateRequest;
use std::{thread};
use service::ReviewDTO;

#[get("/")]
fn get_all() -> Json<Vec<ReviewDTO>> {
    thread::spawn(move || {
        let reviews = service::get_all();
        Json(reviews.unwrap())
    }).join().unwrap()
}

#[get("/product/<id>")]
fn get_all_for_product(id: i32) -> Json<Vec<ReviewDTO>> {
    thread::spawn(move || {
        let reviews = service::get_all_for_product(id);
        Json(reviews.unwrap())
    }).join().unwrap()
}

#[get("/user/<id>")]
fn get_all_for_user(id: i32) -> Json<Vec<ReviewDTO>> {
    thread::spawn(move || {
        let reviews = service::get_all_for_user(id);
        Json(reviews.unwrap())
    }).join().unwrap()
}

#[get("/user/<uid>/product/<pid>")]
fn get_for_user_and_product(uid: i32, pid: i32) -> Json<Vec<ReviewDTO>> {
    thread::spawn(move || {
        let reviews = service::get_for_user_and_product(uid, pid);
        Json(reviews.unwrap())
    }).join().unwrap()
}

#[get("/rating/<id>")]
fn get_rating_for_product(id: i32) -> Json<f32> {
    thread::spawn(move || {
        let rating = service::get_rating_for_product(id);
        Json(rating.unwrap())
    }).join().unwrap()
}

#[delete("/<id>")]
fn delete_review(id: i32) -> Json<String> {
    thread::spawn(move || {
        let resp = service::delete_review(id);
        Json(resp.unwrap())
    }).join().unwrap()
}

#[post("/", format = "json", data = "<review>")]
fn create_review(review: Json<ReviewCreateRequest>) -> Json<String> {
    thread::spawn(move || {
        let resp = service::create_review(review);
        Json(resp.unwrap())
    }).join().unwrap()
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
        .mount("/api/reviews", 
            routes![
                get_all, get_all_for_product, get_all_for_user, 
                delete_review, create_review, 
                get_rating_for_product, get_for_user_and_product
            ])
}