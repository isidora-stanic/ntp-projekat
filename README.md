# NTP predmetni projekat

## Opis
Aplikacija omogućava korisnicima da pregledaju, pretražuju, filtriraju i sortiraju po raznim kriterijumima pločice, parket, laminat i sl. Korisnici mogu ostavljati ocene i komentare za kupljene proizvode. Takođe postoji mogućnost pregleda odabranih proizvoda u 3D editoru, kao i čuvanje podešenih prostorija sa odabranim proizvodima.

Uloge koje postoje u sistemu su registrovani korisnici i administratori, ali aplikaciju mogu koristiti i neregistrovani korisnici.

## Funkcionalnosti

### **Administrator**
- Prijava na sistem
- CRUD administratora
- CRUD proizvoda (pločice, parket, laminat, fugne...)
- Pregled i brisanje komentara uz obrazloženje
- Banovanje korisnika na određeno vreme uz obrazloženje
- Izveštaji o proizvodima (najpopularniji proizvodi, kategorije)
- Pregled 3D modela kako bi određeni proizvod izgledao u nekoj prostoriji

### **Registrovani korisnik**
- Prijava na sistem
- Pregled, pretraga, sortiranje, filtriranje proizvoda
- Pregled preporuka na osnovu odabranih proizvoda
- Praćenje obaveštenja o proizvodu (email obaveštenje o promeni cene, dostupnosti itd.)
- Dodavanje i pregled ocena i komentara
- Pregled 3D modela kako bi odabrani proizvodi izgledali u prostoriji
- Čuvanje odabranih proizvoda i njihovog rasporeda u prostoriji

### **Neregistrovani korisnik**
- Registracija
- Pregled, pretraga, sortiranje, filtriranje proizvoda
- Pregled preporuka na osnovu odabranih proizvoda
- Pregled komentara i ocena
- Pregled 3D modela kako bi odabrani proizvodi izgledali u prostoriji

## Arhitektura sistema
- API gateway (usmeravanje zahteva na odgovarajuće servise) - Python (flask) ili Go
- User service (autentifikacija i autorizacija) - Python (flask) ili Go
- Product service (CRUD proizvoda) - Go
- Review service (ocene i komentari) - Rust
- Recommend service (preporuke proizvoda) - Rust
- Statistics service (izveštaji) - Rust
- Email service (slanje obaveštenja) - Go
- Vision3D service (za čuvanje rasporeda proizvoda po prostorijama) - Go
- Client app - React ili Vue
