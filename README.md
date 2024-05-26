# Upute za pokretanje

## Inicijalizacija baze

1. U ./db/seed.sql je skripta za generiranje baze. Potrebno je napraviti Postgre bazu, schemu "TESTNI_SALON" i u njoj izvršiti navedenu skriptu.
2. Dodati .env informacije za spajanje na bazu i secret za JWT, kostur izgleda ovako: \
    DB_USER=frizer \
    DB_HOST=localhost \
    DB_DATABASE=FRIZERI \
    DB_PASSWORD=snaznaSigurnaLozinka \
    DB_PORT=5432 \
    JWT_SECRET_KEY=jakoRandomString


## Pokretanje aplikacije

1. npm install
2. npm start

Za admin privileges potrebno je kreirati račun, zatim ručno u bazi dignuti role na 1 i onda se ponovno ulogirati. \