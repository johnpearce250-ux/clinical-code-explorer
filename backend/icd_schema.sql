DROP TABLE IF EXISTS codes;

CREATE TABLE codes (
    code TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    chapter TEXT NOT NULL
);

INSERT INTO codes (code, description, chapter) VALUES
    ('J10.1', 'Influenza with other respiratory manifestations, seasonal influenza virus identified', 'X'),
    ('J11.1', 'Influenza with other respiratory manifestations, virus not identified', 'X'),
    ('E11.9', 'Type 2 diabetes mellitus without complications', 'IV'),
    ('I10',   'Essential (primary) hypertension', 'IX'),
    ('R51.9', 'Headache, unspecified', 'XVIII');