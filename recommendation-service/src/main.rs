#[macro_use] extern crate rocket;

use rocket::serde::json::Json;

use std;

use reqwest;
use serde_json;

mod service;
use service::Product;
use service::RecommendationParamDTO;
use service::AnyFilter;
use service::RecommendedProducts;

use std::thread;

#[get("/")]
fn get_all_params() -> Json<Vec<RecommendationParamDTO>> {
    thread::spawn(move || {
        let params = service::get_all();
        Json(params.unwrap())
    }).join().unwrap()
}

#[post("/", format = "json", data = "<req>")]
fn new_param(req: Json<RecommendationParamDTO>) -> Json<String> {
    thread::spawn(move || {
        let resp = service::create(req.into_inner());
        Json(resp.unwrap())
    }).join().unwrap()
}

#[put("/<id>", format = "json", data = "<req>")]
fn update_param(id: i32, req: Json<RecommendationParamDTO>) -> Json<String> {
    thread::spawn(move || {
        let resp = service::update(id, req.into_inner());
        Json(resp.unwrap())
    }).join().unwrap()
}

#[delete("/<id>")]
fn delete_param(id: i32) -> Json<String> {
    thread::spawn(move || {
        let resp = service::delete(id);
        Json(resp.unwrap())
    }).join().unwrap()
}

#[post("/recommend", format = "json", data = "<product>")]
async fn get_recommendations(product: Json<Product>) -> Json<Vec<RecommendedProducts>> {
    let product_id = product.id.clone();
    let product_id2 = product.id.clone();
    let product_finish = product.finish.clone();
    let product_color = product.color.clone();
    let product_material = product.material.clone();
    let product_purpose = product.purpose.clone();
    
    // opening threads
    let handle1 = thread::spawn(move || {
        let params = service::get_all_for_attribute("id".to_string(), product_id.to_string());
        Json(params.unwrap())
    });
    let handle2 = thread::spawn(move || {
        let params_finish = service::get_all_for_attribute("finish".to_string(), product_finish.to_string());
        Json(params_finish.unwrap())
    });
    let handle3 = thread::spawn(move || {
        let params_color = service::get_all_for_attribute("color".to_string(), product_color.to_string());
        Json(params_color.unwrap())
    });
    let handle4 = thread::spawn(move || {
        let params_material = service::get_all_for_attribute("material".to_string(), product_material.to_string());
        Json(params_material.unwrap())
    });

    // handle 1
    let params = handle1.join().unwrap();

    let mut prod_ids: Vec<&str> = params.iter().map(|param| param.value1.as_str()).collect::<Vec<&str>>()
        .iter().filter(|p| &p.to_string() != &product_id.to_string()).cloned().collect();
    let mut prod_ids2: Vec<&str> = params.iter().map(|param| param.value2.as_str()).collect::<Vec<&str>>()
        .iter().filter(|p| &p.to_string() != &product_id.to_string()).cloned().collect();
    prod_ids.append(&mut prod_ids2);
    
    // println!("Product ids: {:#?}", prod_ids);

    let mut products: Vec<RecommendedProducts> = vec![];

    let mut products_ids: Vec<Product> = vec![];

    // getting connected products
    for prod_id in prod_ids {
        // println!("getting product by id: {}", prod_id);
        let url_string: String = format!("http://localhost:9090/api/products/{}", prod_id);
        // println!("URL: {}", url_string);

        let resp: Product = reqwest::get(url_string)
        .await
        .unwrap()
        .json()
        .await.unwrap();
    
        // println!("{:#?}", resp.name);

        products_ids.push(resp);
    }

    products.push(RecommendedProducts {
        based_on: "Id".to_string(), 
        products: products_ids
    });

    // getting connected attributes
    let mut any_filter = AnyFilter {
        finish: vec![],
        color: vec![],
        purpose: vec![product_purpose.clone()],
        material: vec![]
    };
    // handle 2
    let params_finish = handle2.join().unwrap();

    let mut prod_finishes: Vec<String> = params_finish.iter().map(|param| param.value1.clone()).collect();
    let mut prod_finishes2: Vec<String> = params_finish.iter().map(|param| param.value2.clone()).collect();
    prod_finishes.append(&mut prod_finishes2);
    any_filter.finish = prod_finishes;

    // handle 3
    let params_color = handle3.join().unwrap();

    let mut prod_colors: Vec<String> = params_color.iter().map(|param| param.value1.clone()).collect();
    let mut prod_colors2: Vec<String> = params_color.iter().map(|param| param.value2.clone()).collect();
    prod_colors.append(&mut prod_colors2);
    any_filter.color = prod_colors;

    // handle 4
    let params_material = handle4.join().unwrap();

    let mut prod_materials: Vec<String> = params_material.iter().map(|param| param.value1.clone()).collect();
    let mut prod_materials2: Vec<String> = params_material.iter().map(|param| param.value2.clone()).collect();
    prod_materials.append(&mut prod_materials2);
    any_filter.material = prod_materials;

    // println!("filters\n color: {:#?}\n finish: {:#?}\n material: {:#?}\n purpose: {:#?}", any_filter.color, any_filter.finish, any_filter.material, any_filter.purpose);

    let client = reqwest::Client::new();
    let url_string_f: String = format!("http://localhost:9090/api/products/filter/any/{}", &product_id);

    let resp = client.post(url_string_f)
        .json(&serde_json::json!(&any_filter))
        .header("Content-Type", "application/json")
        .send()
        .await
        .unwrap()
        .text()
        .await.unwrap();

    // println!("filtered: \n{:#?}", resp);

    // products.append(&mut serde_json::from_str::<Vec<Product>>(&resp).unwrap());
    products.push(RecommendedProducts {
        based_on: "Filter".to_string(), 
        products: serde_json::from_str::<Vec<Product>>(&resp).unwrap()
    });

    // println!("filtered: \n{:#?}", serde_json::from_str::<Vec<Product>>(&resp).unwrap());



    // getting similar products
    let url_string: String = format!("http://localhost:9090/api/products/similar/{}", product_id2);
    // println!("URL: {}", url_string);

    let resp = reqwest::get(url_string)
        .await
        .unwrap()
        .text()
        .await.unwrap();

    // products.append(&mut resp);
    // println!("similar: \n{:#?}", resp);

    // products.append(&mut serde_json::from_str::<Vec<Product>>(&resp).unwrap());
    products.push(RecommendedProducts {
        based_on: "Similar".to_string(), 
        products: serde_json::from_str::<Vec<Product>>(&resp).unwrap()
    });

    Json(products)
}

#[launch]
fn rocket() -> _ {
    thread::spawn(|| {
        match service::seed_db() {
            Ok(()) => println!("DB is initialized successfuly"),
            Err(error) => println!("There was an error: {:?}", error),
        }        
    }).join().expect("Thread panicked");

    rocket::build()
        .mount("/api/recommendations", 
            routes![
                get_all_params, new_param, delete_param, update_param,
                get_recommendations
            ])
}
