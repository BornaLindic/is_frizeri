-------------------------------- REZERVACIJA --------------------------------
DROP TABLE IF EXISTS "TESTNI_SALON".REZERVACIJA;
CREATE TABLE "TESTNI_SALON".REZERVACIJA (
	"ID" 		SERIAL PRIMARY KEY,
	EMAIL		VARCHAR(50),
	TEL			VARCHAR(20),
	DATUM 		DATE,
	ID_TERMIN	INTEGER
);


-------------------------------- TERMIN -------------------------------------
DROP TABLE IF EXISTS "TESTNI_SALON".TERMIN;
CREATE TABLE "TESTNI_SALON".TERMIN (
	"ID" 		INT PRIMARY KEY,
	VRIJEME		VARCHAR(5)
);

INSERT INTO "TESTNI_SALON".TERMIN VALUES
(1, '09-10'),
(2, '10-11'),
(3, '11-12'),
(4, '13-14'),
(5, '14-15'),
(6, '15-16'),
(7, '16-17');


-------------------------------- DATUM --------------------------------------
DROP TABLE IF EXISTS "TESTNI_SALON".DATUM;
CREATE TABLE "TESTNI_SALON".DATUM (
	"ID" 			SERIAL PRIMARY KEY,
	DAN				DATE UNIQUE,
	RADNI_DAN		BOOLEAN
);

CREATE OR REPLACE FUNCTION "TESTNI_SALON".INSERT_DATES(
	start_date 	DATE,
	end_date 	DATE) RETURNS VOID AS $$
DECLARE
    current DATE := start_date;
    is_workday BOOLEAN;
BEGIN
    WHILE current <= end_date LOOP
        IF EXTRACT(ISODOW FROM current) IN (6, 7) THEN
            is_workday := FALSE;
        ELSE
            is_workday := TRUE;
        END IF;

        INSERT INTO "TESTNI_SALON".DATUM (DAN, RADNI_DAN) VALUES (current, is_workday);
        
        current := current + 1;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

SELECT "TESTNI_SALON".INSERT_DATES('2024-03-01', '2024-05-31');



