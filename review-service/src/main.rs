#[macro_use] 
extern crate rocket;

mod db;

use rocket::{routes, Rocket, Build};
// use rocket::response::content::{self};
use rocket::serde::json::Json;
use db::ReviewCreateRequest;
use std::{thread};

#[get("/")]
fn get_all() -> Json<String> {
    thread::spawn(move || {
        Json(db::get_all().unwrap())
    }).join().unwrap()
}

#[get("/product/<id>")]
fn get_all_for_product(id: i32) -> Json<String> {
    thread::spawn(move || {
        Json(db::get_all_for_product(id).unwrap())
    }).join().unwrap()
}

#[get("/user/<id>")]
fn get_all_for_user(id: i32) -> Json<String> {
    thread::spawn(move || {
        Json(db::get_all_for_user(id).unwrap())
    }).join().unwrap()
}

#[get("/rating/<id>")]
fn get_rating_for_product(id: i32) -> Json<String> {
    thread::spawn(move || {
        Json(db::get_rating_for_product(id).unwrap())
    }).join().unwrap()
}

#[delete("/<id>")]
fn delete_review(id: i32) -> Json<String> {
    thread::spawn(move || {
        Json(db::delete_review(id).unwrap())
    }).join().unwrap()
}

#[post("/", format = "json", data = "<review>")]
fn create_review(review: Json<ReviewCreateRequest>) -> Json<String> {
    thread::spawn(move || {
        Json(db::create_review(review).unwrap())
    }).join().unwrap()
}

#[launch]
fn rocket() -> Rocket<Build> {
    thread::spawn(|| {
        db::seed_db();
        println!("db is probably initialized")
    }).join().expect("Thread panicked");

    rocket::build()
    .mount("/api/reviews", routes![get_all, get_all_for_product, get_all_for_user, delete_review, create_review, get_rating_for_product])
}