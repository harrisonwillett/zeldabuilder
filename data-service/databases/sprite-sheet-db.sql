CREATE TABLE IF NOT EXISTS sprite_sheet_db (
    /* Need a KEY */
    `sprites_id` VARCHAR(36) CHARACTER SET utf8,
    `sprites_name` VARCHAR(26) CHARACTER SET utf8,
    `sprites_access_read` VARCHAR(4) CHARACTER SET utf8,
    `sprites_access_write` VARCHAR(5) CHARACTER SET utf8,
    `sprites_options_height` INT,
    `sprites_options_width` INT,
    `sprites_options_colorChannels` INT
);
INSERT INTO sprite_sheet_db VALUES
    ('0b9bcda2-c278-4539-83d0-7b92a413847d','Over World - Brown','True','False',16,16,4),
    ('0b8edc27-79d6-4f10-8272-b09f339dc20f','Over World - Green','True','False',16,16,4),
    ('0c595db0-e6ab-4999-a3f3-a1a60b8cede5','Over World - Gray','True','False',16,16,4),
    ('5e24b4c7-eb38-4bb0-8fe4-3ae79cf91005','Link - Green','True','False',16,16,4),
    ('f475af10-d131-4490-a41c-1c9cd068e3e6','Items -  Green','True','True',16,16,4),
    ('517eefa1-9594-445e-9430-66ddf0a6ef28','Items - Red','True','True',16,16,4),
    ('917319e7-9381-4830-89e5-c84d42c8eecd','Over World Monsters - Blue','True','True',16,16,4),
    ('329ae04d-0b31-48c5-869e-22b7c3d75f71','Over World Monsters - Red','True','True',16,16,4);
