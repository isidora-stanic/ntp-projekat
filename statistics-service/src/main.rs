#[macro_use] 
extern crate rocket;
extern crate reqwest;

mod db;

use rocket::{routes, Rocket, Build};
use rocket::serde::json::Json;
use db::LogCreateRequest;
use std::{thread};


use serde::{Serialize, Deserialize};
use rocket::http::RawStr;

use std::time::Duration;
use reqwest::ClientBuilder;

#[get("/")]
fn get_all() -> Json<String> {
    thread::spawn(move || {
        Json(db::get_all().unwrap())
    }).join().unwrap()
}

#[get("/statistics-for-all/<logtype>")]
fn get_statistics_for_all(logtype: String) -> Json<String> {
    thread::spawn(move || {
        Json(db::get_count_for_type_product(logtype).unwrap())
    }).join().unwrap()
}

#[get("/statistics-for-all-interval/<logtype>/<t1>/<t2>")]
fn get_statistics_for_all_interval(logtype: String, t1: String, t2: String) -> Json<String> {
    thread::spawn(move || {
        Json(db::get_count_for_type_product_interval(logtype, t1, t2).unwrap())
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

#[derive(Debug, Serialize, Deserialize)]
struct Todo {
    #[serde(rename = "userId")]
    user_id: i32,
    id: Option<i32>,
    title: String,
    completed: bool,
}

// #[get("/prod-comments")]
// fn get_product_comments_from_service() -> Result<String, ()> {
    
//     let request_url = "https://jsonplaceholder.typicode.com/todos?userId=1";
    
//     let timeout = Duration::new(5, 0);
//     let client = ClientBuilder::new().timeout(timeout).build()?;
//     let response = client.head(request_url).send()?;

//     response.body()

//     // let todos: Vec<Todo> = reqwest::Client::new()
//     //     .get("https://jsonplaceholder.typicode.com/todos?userId=1")
//     //     .send()
//     //     .await?
//     //     .json()
//     //     .await?;

//     // println!("{:#?}", todos);

//     // // Send and receive type-checked JSON

//     // let new_todo = Todo {
//     //     user_id: 1,
//     //     id: None,
//     //     title: "Subscribe to Let's Get Rusty".to_owned(),
//     //     completed: false
//     // };

//     // let new_todo: Todo = reqwest::Client::new()
//     //     .post("https://jsonplaceholder.typicode.com/todos")
//     //     .json(&new_todo)
//     //     .send()
//     //     .await?
//     //     .json()
//     //     .await?;

//     // println!("{:#?}", new_todo);

//     // // Send and receive arbitrary JSON

//     // let new_todo: serde_json::Value = reqwest::Client::new()
//     //     .post("https://jsonplaceholder.typicode.com/todos")
//     //     .json(&serde_json::json!({
//     //         "userId": 1,
//     //         "title": "Subscribe to Let's Get Rusty".to_owned(),
//     //         "completed": false
//     //     }))
//     //     .send()
//     //     .await?
//     //     .json()
//     //     .await?;

//     // println!("{:#?}", new_todo);

//     // Ok(())

// }

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
    get_statistics_for_all, get_statistics_for_all_interval])
}