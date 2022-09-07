use postgres::{Client, Error, NoTls};
use chrono::{prelude::*};
use serde::{Serialize, Deserialize};


#[derive(Serialize, Deserialize)]
pub struct Log {
    id: i32,
    log_type: String,
    product_id: i32,
    timestamp: String,
    product: String,
}

#[derive(Serialize, Deserialize)]
pub struct LogCreateRequest {
    log_type: String,
    product_id: i32,
    timestamp: String,
    product: String,
}

#[derive(Serialize)]
struct Response {
    message: String
}

#[derive(Serialize, Deserialize)]
pub struct StatsCount {
    product_id: i32,
    log_type: String,
    stat_count: String,
    product: String,
}

#[derive(Serialize, Deserialize)]
pub struct StatsCountAllResponse {
    visits: Vec<StatsCount>,
    comments: Vec<StatsCount>,
    saves: Vec<StatsCount>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Subscription{
    id: i32,
    product_id: i32,
	email: String,
}

#[derive(Debug, Serialize, Deserialize)]
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
pub struct Product {
    pub id: i32, 
    pub name: String, 
    pub description: String, 
    pub image: String, 
    pub price: f32, 
    pub sku: String, 
    pub producer: String,
    pub brand: String,
    pub dimensions: String, 
    pub p_type: String,
    pub finish: String, 
    pub purpose: String,
    pub color: String,
    pub serie: String,
    pub box_size: f32,
    pub material: String,
}

// init db
pub fn seed_db() -> Result<(), Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/statistics_db",
        NoTls,
    )?;

    client.batch_execute("DROP TABLE IF EXISTS public.logs")?;

    client.batch_execute(
        "
        CREATE TABLE IF NOT EXISTS public.logs (
            id                  SERIAL PRIMARY KEY,
            log_type            VARCHAR NOT NULL,
            product_id          INTEGER NOT NULL,
            timestamp           VARCHAR NOT NULL,
            product             VARCHAR
            )
    ",
    )?;

    client.execute(
        "INSERT INTO public.logs (log_type, product_id, timestamp, product) VALUES ($1, $2, $3, $4)",
        &[
            &"VISIT", 
            &2.to_owned(),
            &str::replace(&Utc.ymd(2022, 3, 5).to_string(), "UTC", ""), 
            &"ZORKA Architect KDS - 02 (light blue smoot)", 
        ],
    )?;

    client.close()?;

    Ok(())
}

// repo
pub fn get_all() -> Result<Vec<Log>, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/statistics_db",
        NoTls,
    )?;

    let mut ret: Vec<Log> = vec![];
    for row in client.query("SELECT id, log_type, product_id, timestamp, product FROM public.logs", &[])? {
        let id: i32 = row.get(0);
        let log_type: &str = row.get(1);
        let product_id: i32 = row.get(2);
        let timestamp: &str = row.get(3);
        let product: &str = row.get(4);
        
        ret.push(Log { 
            id: (id),
            product_id: (product_id),
            log_type: (log_type.to_string()),
            timestamp: (timestamp.to_string()),
            product: (product.to_string())});
        
    }
    client.close()?;

    Ok(ret)
}

pub fn get_all_product_logs_of_type(log_type: String) -> Result<Vec<Log>, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/statistics_db",
        NoTls,
    )?;

    let mut ret: Vec<Log> = vec![];
    for row in client.query("SELECT id, log_type, product_id, timestamp, product FROM public.logs WHERE log_type = $1", &[&log_type])? {
        let id: i32 = row.get(0);
        let product_id: i32 = row.get(2);
        let timestamp: &str = row.get(3);
        let product: &str = row.get(4);
        
        ret.push(Log { 
            id: (id),
            product_id: (product_id),
            log_type: (log_type.to_string()),
            timestamp: (timestamp.to_string()),
            product: (product.to_string())});
        
    }
    client.close()?;

    Ok(ret)
}

pub fn get_product_logs_of_type(product_id: i32, log_type: String) -> Result<Vec<Log>, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/statistics_db",
        NoTls,
    )?;

    let mut ret: Vec<Log> = vec![];
    for row in client.query("SELECT id, log_type, product_id, timestamp, product FROM public.logs WHERE log_type = $1 AND product_id = $2", &[&log_type, &product_id])? {
        let id: i32 = row.get(0);
        let timestamp: &str = row.get(3);
        let product: &str = row.get(4);
        
        ret.push(Log { 
            id: (id),
            product_id: (product_id),
            log_type: (log_type.to_string()),
            timestamp: (timestamp.to_string()), 
            product: (product.to_string())});
        
    }
    client.close()?;

    Ok(ret)
}

pub fn create_log(log: LogCreateRequest, log_type: String) -> Result<String, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/statistics_db",
        NoTls,
    )?;
    
    client.execute(
        "INSERT INTO public.logs (log_type, product_id, timestamp, product) VALUES ($1, $2, $3, $4)",
        &[
            &log_type.to_owned(), 
            &log.product_id.to_owned(), 
            &log.timestamp.to_string(),
            &log.product.as_str(),
        ],
    )?;

    client.close()?;

    Ok("Log successfuly added.".to_string())
}

// actual statistics
pub fn get_count_for_type_product(log_type: String) -> Result<Vec<StatsCount>, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/statistics_db",
        NoTls,
    )?;

    let mut ret: Vec<StatsCount> = vec![];
    for row in client.query("SELECT product_id, product, COUNT(*) FROM public.logs WHERE log_type = $1 GROUP BY product_id, product", &[&log_type])? {
        let product_id: i32 = row.get(0);
        let product: &str = row.get(1);
        let count: i64 = row.get(2);
        ret.push(StatsCount {
            product_id: (product_id),
            product: (product.to_string()),
            log_type: (log_type.to_string()),
            stat_count: (count.to_string()),
        });
    }

    client.close()?;
    Ok(ret)
}

// actual statistics interval
pub fn get_count_for_type_product_interval(log_type: String, t1: String, t2: String) -> Result<Vec<StatsCount>, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/statistics_db",
        NoTls,
    )?;

    let mut ret: Vec<StatsCount> = vec![];
    for row in client.query("SELECT product_id, product, COUNT(*) FROM public.logs WHERE log_type = $1 and timestamp >= $2 and timestamp <= $3  GROUP BY product_id, product", &[&log_type, &t1, &t2])? {
        let product_id: i32 = row.get(0);
        let product: &str = row.get(1);
        let count: i64 = row.get(2);
        ret.push(StatsCount {
            product_id: (product_id),
            product: (product.to_string()),
            log_type: (log_type.to_string()),
            stat_count: (count.to_string()),
        });
    }

    client.close()?;
    Ok(ret)
}

pub async fn get_sub_count_for_products() -> Result<Vec<(Product, i32)>, Error> {
    let url_string: String = format!("http://localhost:9090/api/products");

    let products: Vec<Product> = reqwest::get(url_string)
        .await
        .unwrap()
        .json()
        .await.unwrap();

    let mut prod_sub_count: Vec<(Product, i32)> = Vec::new();

    for product in products{
        let url_string: String = format!("http://localhost:9090/api/products/sub/{:?}", product.id);

        let subs: Vec<Subscription> = reqwest::get(url_string)
            .await
            .unwrap()
            .json()
            .await.unwrap();

        if subs.len() > 0 {
            prod_sub_count.push((product, subs.len().try_into().unwrap()));
        }
        
    }

    prod_sub_count.sort_by(|&(_, sc1), &(_, sc2)| sc2.cmp(&sc1));

    Ok(prod_sub_count)
}

pub async fn get_comment_count_for_products() -> Result<Vec<(Product, i32)>, Error> {
    let url_string: String = format!("http://localhost:9090/api/products");

    let products: Vec<Product> = reqwest::get(url_string)
        .await
        .unwrap()
        .json()
        .await.unwrap();

    let mut prod_comment_count: Vec<(Product, i32)> = Vec::new();

    for product in products{
        let url_string: String = format!("http://localhost:9081/api/reviews/product/{:?}", product.id);

        let comments: Vec<ReviewDTO> = reqwest::get(url_string)
            .await
            .unwrap()
            .json()
            .await.unwrap();

        if comments.len() > 0 {
            prod_comment_count.push((product, comments.len().try_into().unwrap()));
        }
        
    }

    prod_comment_count.sort_by(|&(_, sc1), &(_, sc2)| sc2.cmp(&sc1));

    Ok(prod_comment_count)
}

pub async fn get_rating_for_products() -> Result<Vec<(Product, f32)>, Error> {
    let url_string: String = format!("http://localhost:9090/api/products");

    let products: Vec<Product> = reqwest::get(url_string)
        .await
        .unwrap()
        .json()
        .await.unwrap();

    let mut prod_ratings: Vec<(Product, f32)> = Vec::new();

    for product in products{
        let url_string: String = format!("http://localhost:9081/api/reviews/rating/{:?}", product.id);

        println!("{}", url_string);

        let rating: f32 = reqwest::get(url_string)
            .await
            .unwrap()
            .json()
            .await.unwrap();
 
        if rating > 0.0 {
            prod_ratings.push((product, rating));
        }        
    }

    prod_ratings.sort_by(|&(_, sc1), &(_, sc2)| sc2.partial_cmp(&sc1).unwrap());

    Ok(prod_ratings)
}