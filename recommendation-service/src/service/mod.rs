use postgres::{Client, Error, NoTls};

use rocket::serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
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

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct AnyFilter {
    pub finish: Vec<String>,
    pub color: Vec<String>,
	pub purpose: Vec<String>,
	pub material: Vec<String>
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct RecommendationParam {
    pub id: i32, 
    pub based_on: String, 
    pub value1: String, 
    pub value2: String,
    pub deleted: bool
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct RecommendationParamDTO {
    pub id: i32, 
    pub based_on: String, 
    pub value1: String, 
    pub value2: String
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct RecommendedProducts {
    pub based_on: String,
    pub products: Vec<Product>
}

// init db
pub fn seed_db() -> Result<(), Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/recommendation_db",
        NoTls,
    )?;

    client.batch_execute("DROP TABLE IF EXISTS public.recommendation_param")?;

    client.batch_execute(
        "
        CREATE TABLE IF NOT EXISTS public.recommendation_param (
            id                  SERIAL PRIMARY KEY,
            based_on            VARCHAR NOT NULL,
            value1              VARCHAR NOT NULL,
            value2              VARCHAR NOT NULL,
            deleted             BOOLEAN
            )
    ",
    )?;

    client.execute(
        "INSERT INTO public.recommendation_param (based_on, value1, value2, deleted) VALUES ($1, $2, $3, $4)",
        &[
            &"id", 
            &"3", 
            &"1",
            &false
        ],
    )?;

    client.execute(
        "INSERT INTO public.recommendation_param (based_on, value1, value2, deleted) VALUES ($1, $2, $3, $4)",
        &[
            &"id", 
            &"1", 
            &"2",
            &false
        ],
    )?;

    client.execute(
        "INSERT INTO public.recommendation_param (based_on, value1, value2, deleted) VALUES ($1, $2, $3, $4)",
        &[
            &"color", 
            &"bela", 
            &"Plava",
            &false
        ],
    )?;

    client.execute(
        "INSERT INTO public.recommendation_param (based_on, value1, value2, deleted) VALUES ($1, $2, $3, $4)",
        &[
            &"color", 
            &"bela", 
            &"braon",
            &false
        ],
    )?;

    client.execute(
        "INSERT INTO public.recommendation_param (based_on, value1, value2, deleted) VALUES ($1, $2, $3, $4)",
        &[
            &"color", 
            &"siva", 
            &"crna",
            &false
        ],
    )?;

    client.execute(
        "INSERT INTO public.recommendation_param (based_on, value1, value2, deleted) VALUES ($1, $2, $3, $4)",
        &[
            &"color", 
            &"bela", 
            &"siva",
            &false
        ],
    )?;

    client.execute(
        "INSERT INTO public.recommendation_param (based_on, value1, value2, deleted) VALUES ($1, $2, $3, $4)",
        &[
            &"finish", 
            &"Mat", 
            &"sjaj",
            &false
        ],
    )?;

    client.execute(
        "INSERT INTO public.recommendation_param (based_on, value1, value2, deleted) VALUES ($1, $2, $3, $4)",
        &[
            &"material", 
            &"drvo", 
            &"Keramika",
            &false
        ],
    )?;

    client.close()?;

    Ok(())
}

// repo
pub fn get_all() -> Result<Vec<RecommendationParamDTO>, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/recommendation_db",
        NoTls,
    )?;

    let mut ret: Vec<RecommendationParamDTO> = vec![];
    for row in client.query("SELECT id, based_on, value1, value2 FROM public.recommendation_param WHERE deleted = false", &[])? {
        let id: i32 = row.get(0);
        let based_on: &str = row.get(1);
        let value1: &str = row.get(2);
        let value2: &str = row.get(3);
        
        ret.push(RecommendationParamDTO { 
            id: (id),
            based_on: (based_on.to_string()),
            value1: (value1.to_string()),
            value2: (value2.to_string())
        });
        
    }

    client.close()?;

    Ok(ret)
}

pub fn create(rp: RecommendationParamDTO) -> Result<String, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/recommendation_db",
        NoTls,
    )?;

    client.execute(
        "INSERT INTO public.recommendation_param (based_on, value1, value2, deleted) VALUES ($1, $2, $3, $4)",
        &[
            &rp.based_on.as_str(), 
            &rp.value1.as_str(), 
            &rp.value2.as_str(),
            &false,
        ],
    )?;

    client.close()?;

    Ok("Successfuly added recommendation parameter".to_string())
}

pub fn update(id: i32, rp: RecommendationParamDTO) -> Result<String, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/recommendation_db",
        NoTls,
    )?;

    client.execute(
        "UPDATE public.recommendation_param SET based_on = $1, value1 = $2, value2 = $3 WHERE id = $4",
        &[
            &rp.based_on.as_str(), 
            &rp.value1.as_str(), 
            &rp.value2.as_str(),
            &id
        ],
    )?;

    client.close()?;

    Ok("Successfuly updated recommendation parameter".to_string())
}

pub fn delete(id: i32) -> Result<String, Error> {
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/recommendation_db",
        NoTls,
    )?;

    client.execute(
        "UPDATE public.recommendation_param SET deleted = true WHERE id = $1",
        &[&id],
    )?;

    client.close()?;

    Ok("Successfuly deleted recommendation parameter".to_string())
}

// e2e

pub fn get_all_for_attribute(attribute: String, value: String) -> Result<Vec<RecommendationParamDTO>, Error> {
    println!("{:#?} {:#?}", attribute, value);
    let mut client = Client::connect(
        "postgresql://postgres:password@localhost:5432/recommendation_db",
        NoTls,
    )?;

    let mut ret: Vec<RecommendationParamDTO> = vec![];
    for row in client.query("SELECT id, based_on, value1, value2 FROM public.recommendation_param WHERE deleted = false AND based_on = $1 AND (value1 = $2 OR value2 = $2)", &[&attribute, &value])? {
        let id: i32 = row.get(0);
        let based_on: &str = row.get(1);
        let value1: &str = row.get(2);
        let value2: &str = row.get(3);
        
        ret.push(RecommendationParamDTO { 
            id: (id),
            based_on: (based_on.to_string()),
            value1: (value1.to_string()),
            value2: (value2.to_string())
        });

        println!("{:#?} {:#?} {:#?}", based_on, value1, value2);
        
    }

    client.close()?;

    Ok(ret)
}