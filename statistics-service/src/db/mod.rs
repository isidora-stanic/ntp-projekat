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
struct StatsCount {
    product_id: i32,
    log_type: String,
    stat_count: String,
}

#[derive(Serialize, Deserialize)]
struct StatsCountAllResponse {
    visits: Vec<StatsCount>,
    comments: Vec<StatsCount>,
    saves: Vec<StatsCount>,
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
            &"COMMENT", 
            &2.to_owned(), 
            &str::replace(&Utc.ymd(2022, 3, 5).to_string(), "UTC", ""), 
            &"Zorka blue smoot", 
        ],
    )?;

    client.execute(
        "INSERT INTO public.logs (log_type, product_id, timestamp, product) VALUES ($1, $2, $3, $4)",
        &[
            &"VISIT", 
            &2.to_owned(),
            &str::replace(&Utc.ymd(2022, 3, 5).to_string(), "UTC", ""), 
            &"Zorka blue smoot", 
        ],
    )?;

    client.execute(
        "INSERT INTO public.logs (log_type, product_id, timestamp, product) VALUES ($1, $2, $3, $4)",
        &[
            &"SAVE",
            &2.to_owned(), 
            &str::replace(&Utc.ymd(2022, 3, 5).to_string(), "UTC", ""), 
            &"Zorka blue smoot"
        ],
    )?;

    client.close()?;

    Ok(())
}

// repo
pub fn get_all() -> Result<String, Error> {
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

    Ok(serde_json::to_string(&ret).unwrap())
}

pub fn get_all_product_logs_of_type(log_type: String) -> Result<String, Error> {
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

    Ok(serde_json::to_string(&ret).unwrap())
}

pub fn get_product_logs_of_type(product_id: i32, log_type: String) -> Result<String, Error> {
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

    Ok(serde_json::to_string(&ret).unwrap())
}

pub fn create_log(log: rocket::serde::json::Json<LogCreateRequest>, log_type: String) -> Result<String, Error> {
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

    Ok(serde_json::to_string(&Response{message: "Log successfull.".to_string()}).unwrap())
}

// actual statistics
pub fn get_count_for_type_product(log_type: String) -> Result<String, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/statistics_db",
        NoTls,
    )?;

    let mut ret: Vec<StatsCount> = vec![];
    for row in client.query("SELECT product_id, COUNT(*) FROM public.logs WHERE log_type = $1 GROUP BY product_id", &[&log_type])? {
        let product_id: i32 = row.get(0);
        let count: i64 = row.get(1);
        ret.push(StatsCount {
            product_id: (product_id),
            log_type: (log_type.to_string()),
            stat_count: (count.to_string()),
        });
    }

    client.close()?;
    Ok(serde_json::to_string(&ret).unwrap())
}

// pub fn get_statistics_for_all() -> Result<String, Error> {
//     let mut client = Client::connect(
//         "postgresql://postgres:password@localhost:5432/statistics_db",
//         NoTls,
//     )?;

//     let mut retV = get_count_for_type_product("VISIT".to_string())
//     let mut retC = get_count_for_type_product("COMMENT".to_string())
//     let mut retS = get_count_for_type_product("SAVE".to_string())

//     let mut ret: StatsCountAllResponse = {
//         visits: retV,
//         comments: retC,
//         saves: retS,
//     }
    
//     client.close()?;

//     Ok(serde_json::to_string(&ret).unwrap())
// }