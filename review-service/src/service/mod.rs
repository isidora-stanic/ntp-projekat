use postgres::{Client, Error, NoTls};
use chrono::{prelude::*};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Review {
    id: i32,
    user_id: i32,
    product_id: i32,
    rate: i32,
    comment: String,
    timestamp: String,
    user: String,
    product: String,
    deleted: bool,
    why_deleted: String
}

#[derive(Serialize, Deserialize)]
pub struct ReviewDTO {
    id: i32,
    user_id: i32,
    product_id: i32,
    rate: i32,
    comment: String,
    timestamp: String,
    user: String,
    product: String
}

#[derive(Serialize, Deserialize)]
pub struct ReviewCreateRequest {
    user_id: i32,
    product_id: i32,
    rate: i32,
    comment: String,
    timestamp: String,
    user: String,
    product: String
}

#[derive(Serialize, Deserialize)]
pub struct ReviewDeleteRequest {
    id: i32,
    why_deleted: String
}

#[derive(Serialize)]
struct Response {
    message: String
}

// init db
pub fn seed_db() -> Result<(), Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/review_db",
        NoTls,
    )?;

    client.batch_execute("DROP TABLE IF EXISTS public.reviews")?;

    client.batch_execute(
        "
        CREATE TABLE IF NOT EXISTS public.reviews (
            id                  SERIAL PRIMARY KEY,
            user_id             INTEGER,
            product_id          INTEGER,
            rate                INTEGER,
            review_comment      VARCHAR NOT NULL,
            timestamp           VARCHAR NOT NULL,
            user_info           VARCHAR NOT NULL,
            product             VARCHAR NOT NULL,
            deleted             BOOLEAN,
            why_deleted         VARCHAR
            )
    ",
    )?;

    client.execute(
        "INSERT INTO public.reviews (user_id, product_id, rate, review_comment, timestamp, user_info, product, deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        &[
            &2.to_owned(), 
            &1.to_owned(), 
            &3.to_owned(), 
            &"Not perfect but it is quite cheap.", 
            &str::replace(&Utc.ymd(2022, 3, 5).to_string(), "UTC", ""), 
            &"isidora", 
            &"Zorka blue smoot", 
            &false
        ],
    )?;

    client.execute(
        "INSERT INTO public.reviews (user_id, product_id, rate, review_comment, timestamp, user_info, product, deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        &[
            &2.to_owned(), 
            &2.to_owned(), 
            &4.to_owned(), 
            &"Nearly perfect and is also quite cheap.", 
            &str::replace(&Utc.ymd(2022, 3, 5).to_string(), "UTC", ""),  
            &"isidora", 
            &"Zorka blue", 
            &false
        ],
    )?;

    client.execute(
        "INSERT INTO public.reviews (user_id, product_id, rate, review_comment, timestamp, user_info, product, deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        &[
            &1.to_owned(), 
            &2.to_owned(), 
            &5.to_owned(), 
            &"Absolutely perfect.", 
            &&str::replace(&Utc.ymd(2022, 3, 5).to_string(), "UTC", ""), 
            &"admin", 
            &"Zorka blue", 
            &false
        ],
    )?;

    client.close()?;

    Ok(())
}


// repo
pub fn get_all() -> Result<Vec<ReviewDTO>, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/review_db",
        NoTls,
    )?;

    let mut ret: Vec<ReviewDTO> = vec![];
    for row in client.query("SELECT id, user_id, product_id, rate, review_comment, timestamp, user_info, product FROM public.reviews WHERE deleted = false", &[])? {
        let id: i32 = row.get(0);
        let user_id: i32 = row.get(1);
        let product_id: i32 = row.get(2);
        let rate: i32 = row.get(3);
        let comment: &str = row.get(4);
        let timestamp_str: &str = row.get(5);
        let user: &str = row.get(6);
        let product: &str = row.get(7);
        
        ret.push(ReviewDTO { id: (id), user_id: (user_id), product_id: (product_id), rate: (rate), comment: (comment.to_string()), timestamp: (timestamp_str.to_string()), user: (user.to_string()), product: (product.to_string())});
        
    }
    client.close()?;

    Ok(ret)
}

pub fn get_all_for_product(id: i32) -> Result<Vec<ReviewDTO>, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/review_db",
        NoTls,
    )?;

    let mut ret: Vec<ReviewDTO> = vec![];
    for row in client.query("SELECT id, user_id, product_id, rate, review_comment, timestamp, user_info, product FROM public.reviews WHERE product_id = $1 and deleted = false", &[&id])? {
        let id: i32 = row.get(0);
        let user_id: i32 = row.get(1);
        let product_id: i32 = row.get(2);
        let rate: i32 = row.get(3);
        let comment: &str = row.get(4);
        let timestamp_str: &str = row.get(5);
        let user: &str = row.get(6);
        let product: &str = row.get(7);
        
        ret.push(ReviewDTO { id: (id), user_id: (user_id), product_id: (product_id), rate: (rate), comment: (comment.to_string()), timestamp: (timestamp_str.to_string()), user: (user.to_string()), product: (product.to_string())});
        
    }
    client.close()?;

    Ok(ret)
}

pub fn get_all_for_user(id: i32) -> Result<Vec<ReviewDTO>, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/review_db",
        NoTls,
    )?;

    let mut ret: Vec<ReviewDTO> = vec![];
    for row in client.query("SELECT id, user_id, product_id, rate, review_comment, timestamp, user_info, product FROM public.reviews WHERE user_id = $1 and deleted = false", &[&id])? {
        let id: i32 = row.get(0);
        let user_id: i32 = row.get(1);
        let product_id: i32 = row.get(2);
        let rate: i32 = row.get(3);
        let comment: &str = row.get(4);
        let timestamp_str: &str = row.get(5);
        let user: &str = row.get(6);
        let product: &str = row.get(7);
        
        ret.push(ReviewDTO { id: (id), user_id: (user_id), product_id: (product_id), rate: (rate), comment: (comment.to_string()), timestamp: (timestamp_str.to_string()), user: (user.to_string()), product: (product.to_string())});
    }
    client.close()?;

    Ok(ret)
}

pub fn get_for_user_and_product(uid: i32, pid: i32) -> Result<Vec<ReviewDTO>, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/review_db",
        NoTls,
    )?;

    let mut ret: Vec<ReviewDTO> = vec![];
    for row in client.query("SELECT id, user_id, product_id, rate, review_comment, timestamp, user_info, product FROM public.reviews WHERE user_id = $1 and product_id = $2 and deleted = false", &[&uid, &pid])? {
        let id: i32 = row.get(0);
        let user_id: i32 = row.get(1);
        let product_id: i32 = row.get(2);
        let rate: i32 = row.get(3);
        let comment: &str = row.get(4);
        let timestamp_str: &str = row.get(5);
        let user: &str = row.get(6);
        let product: &str = row.get(7);
        
        ret.push(ReviewDTO { id: (id), user_id: (user_id), product_id: (product_id), rate: (rate), comment: (comment.to_string()), timestamp: (timestamp_str.to_string()), user: (user.to_string()), product: (product.to_string())});
    }
    client.close()?;

    Ok(ret)
}

pub fn get_rating_for_product(id_product: i32) -> Result<f32, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/review_db",
        NoTls,
    )?;

    let mut count: i32 = 0;
    let mut sum: i32 = 0;
    for _row in client.query("SELECT rate FROM public.reviews WHERE product_id = $1 AND deleted = false", &[&id_product])? {
        let rate: i32 = _row.get(0);
        sum += rate;
        count += 1;
    }
    client.close()?;

    if count > 0 {
        let rating: f32 = sum as f32/count as f32;
        Ok(rating)
    } else {
        let rating: f32 = 0.0;
        Ok(rating)
    }    
}

pub fn delete_review(id: i32) -> Result<String, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/review_db",
        NoTls,
    )?;

    client.execute(
        "UPDATE reviews SET deleted=true WHERE id=$1",
        &[&id],
    )?;

    client.close()?;

    Ok("Successfuly deleted review".to_string())
}

pub fn create_review(review: rocket::serde::json::Json<ReviewCreateRequest>) -> Result<String, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/review_db",
        NoTls,
    )?;

    // let timestamp_date_new = NativeDate::parse_from_str(review.timestamp.as_str(), "%Y-%m-%d").unwrap();
    for row in client.query("SELECT product_id, user_id FROM public.reviews WHERE product_id = $1 and user_id = $2 and deleted = false", &[&review.product_id, &review.user_id])? {
        let pid: i32 = row.get(0);
        let uid: i32 = row.get(1);
        if (pid == review.product_id) && (uid > review.user_id) {
            client.close()?;
            return Ok("Review overlaps with another review of the same product by the same user.".to_string());
        }
    }
    
    client.execute(
        "INSERT INTO public.reviews (user_id, product_id, rate, review_comment, timestamp, user_info, product, deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        &[
            &review.user_id.to_owned(), 
            &review.product_id.to_owned(), 
            &review.rate.to_owned(), 
            &review.comment.as_str(), 
            &review.timestamp.to_string(), 
            &review.user,
            &review.product,
            &false
        ],
    )?;

    client.close()?;

    Ok("Review successfull.".to_string())
}