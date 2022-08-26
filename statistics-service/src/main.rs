#[macro_use] 
extern crate rocket;

mod db;

use rocket::{routes, Rocket, Build};
use rocket::serde::json::Json;
use db::LogCreateRequest;
use std::{thread};

#[get("/")]
fn get_all() -> Json<String> {
    thread::spawn(move || {
        Json(db::get_all().unwrap())
    }).join().unwrap()
}

#[get("/statistics-for-all")]
fn get_statistics_for_all() -> Json<String> {
    thread::spawn(move || {
        Json(db::get_count_for_type_product("VISIT".to_string()).unwrap())
    }).join().unwrap()
}

#[get("/visits")]
fn get_all_product_visits() -> Json<String> {
    thread::spawn(move || {
        Json(db::get_all_product_logs_of_type("VISIT".to_string()).unwrap())
    }).join().unwrap()
}

#[get("/comments")]
fn get_all_product_comments() -> Json<String> {
    thread::spawn(move || {
        Json(db::get_all_product_logs_of_type("COMMENT".to_string()).unwrap())
    }).join().unwrap()
}

#[get("/saves")]
fn get_all_product_saves() -> Json<String> {
    thread::spawn(move || {
        Json(db::get_all_product_logs_of_type("SAVE".to_string()).unwrap())
    }).join().unwrap()
}

#[get("/visits/<id>")]
fn get_product_visits(id: i32) -> Json<String> {
    thread::spawn(move || {
        Json(db::get_product_logs_of_type(id, "VISIT".to_string()).unwrap())
    }).join().unwrap()
}

#[get("/comments/<id>")]
fn get_product_comments(id: i32) -> Json<String> {
    thread::spawn(move || {
        Json(db::get_product_logs_of_type(id, "COMMENT".to_string()).unwrap())
    }).join().unwrap()
}

#[get("/saves/<id>")]
fn get_product_saves(id: i32) -> Json<String> {
    thread::spawn(move || {
        Json(db::get_product_logs_of_type(id, "SAVE".to_string()).unwrap())
    }).join().unwrap()
}

#[post("/visit", format = "json", data = "<req>")]
fn add_visit(req: Json<LogCreateRequest>) -> Json<String> {
    thread::spawn(move || {
        Json(db::create_log(req, "VISIT".to_string()).unwrap())
    }).join().unwrap()
}

#[post("/comment", format = "json", data = "<req>")]
fn add_comment(req: Json<LogCreateRequest>) -> Json<String> {
    thread::spawn(move || {
        Json(db::create_log(req, "COMMENT".to_string()).unwrap())
    }).join().unwrap()
}

#[post("/save", format = "json", data = "<req>")]
fn add_save(req: Json<LogCreateRequest>) -> Json<String> {
    thread::spawn(move || {
        Json(db::create_log(req, "SAVE".to_string()).unwrap())
    }).join().unwrap()
}

#[launch]
fn rocket() -> Rocket<Build> {
    thread::spawn(|| {
        db::seed_db();
        println!("db is probably initialized")
    }).join().expect("Thread panicked");

    rocket::build()
    .mount("/api/statistics", routes![get_all, 
    get_all_product_visits, get_all_product_comments, get_all_product_saves, 
    get_product_visits, get_product_comments, get_product_saves,
    add_visit, add_comment, add_save,
    get_statistics_for_all])
}