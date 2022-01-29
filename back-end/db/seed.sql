\c retro_haven_dev;

INSERT INTO users (id, first_name, last_name, phone_number, date_of_birth, address, email, image) VALUES 
('dPneoZt769MvZBp1VGfJkEq417j1', 'Adam', 'Tahiri', 3472829710, '1994-12-03', '383 Raritan Avenue', 'tahiri08@hotmail.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'),
('77Kkd6UM6ggnTbZxR3NMG3uieP73', 'Anas', 'Nahil', 3471234567, '1980-01-01', '111 Made Up Street', 'anasnahil@pursuit.org', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'),
('i2fAV92rUiSA4N442t2DUeCXJvN2', 'Carina', 'Taverez', 3472345678, '1990-01-01', '22-10 Brookhaven Ave', 't.carina@rocketmail.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'),
('8fFWde4Em6S0JjYSeAV2v489Qxu2', 'Demi', 'Jobi', 7181234567, '1996-01-01', '1165 boston road', 'demi.orderhood@gmail.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');


INSERT INTO categories (name) VALUES
('gaming'),
('Movies/TV'),
('Retro Toys');



INSERT INTO items (category_id,photo, name, description, price, location, user_id) VALUES 
(1, 'https://firebasestorage.googleapis.com/v0/b/retro-haven.appspot.com/o/items%2FDoom3_XBOX.jpeg?alt=media&token=d0746bc9-172e-447a-b4f4-6cf53284e001', 'Doom 3 Limited Collectors Edition, Xbox 1', 'Doom 3 Limited Collectors Edition - Original Xbox - No Manual - Tested.', 10, 'dongan hills, staten island', 'dPneoZt769MvZBp1VGfJkEq417j1'),
(1, 'https://firebasestorage.googleapis.com/v0/b/retro-haven.appspot.com/o/items%2FN64.jpeg?alt=media&token=3b2968f2-4d9e-4c32-aff9-bd20543cb179', 'N64 with controllers', 'Nintendo 64 Bundle - Expansion Pak, Controller, & Cords - Tested', 165, 'bay ridge, brooklyn', 'dPneoZt769MvZBp1VGfJkEq417j1'),
(1, 'https://firebasestorage.googleapis.com/v0/b/retro-haven.appspot.com/o/items%2FNES_controler.jpeg?alt=media&token=b2c222c0-a196-4a5c-b772-16c033de92a6', 'NES Controller', 'Original NES Controller - OEM Nintendo - Tested.', 15, 'kipps bay, manhattan', 'dPneoZt769MvZBp1VGfJkEq417j1'),
(1, 'https://firebasestorage.googleapis.com/v0/b/retro-haven.appspot.com/o/items%2FNintedowii.jpeg?alt=media&token=9d874767-f78f-4371-9717-16d4c1056df6', 'Nintendo Wii', 'Nintendo Wii Bundle RVL-001 -Controller, & Cords - Tested. No AV Cords', 80, 'woodside, queens','dPneoZt769MvZBp1VGfJkEq417j1'),
(1, 'https://firebasestorage.googleapis.com/v0/b/retro-haven.appspot.com/o/items%2FPS1.jpeg?alt=media&token=ee1b8a17-3c18-44f1-976c-a942de8824f9', 'PlayStation 1', 'Sony Playstation 1 PS1 - SCPH-1001 - In Box - Tested. Condition is "Used". Shipped with USPS Priority Mail. Does not include styrofoam, manuals, or controller.', 130, 'flushing, queens', 'dPneoZt769MvZBp1VGfJkEq417j1'),
(1, 'https://firebasestorage.googleapis.com/v0/b/retro-haven.appspot.com/o/items%2Fadventureoflink_NES.jpeg?alt=media&token=dd10a7ef-62c1-4333-9428-879f9720a353', 'Legend of Zelda 2 - NES', 'Zelda 2: The Adventure of Link - Nintendo NES - Authentic - Tested.', 40, 'parkchester, bronx', 'dPneoZt769MvZBp1VGfJkEq417j1'),
(2, 'https://firebasestorage.googleapis.com/v0/b/retro-haven.appspot.com/o/items%2FSpongebob.jpeg?alt=media&token=e8f2a4ed-ea5d-47dd-9264-388a1810399c', 'Nickelodeon VHS Bundle', 'Bundle of 3 Nickelodeon VHS tapes: Spongebob(Sponge Buddies & Nautical Nonsense) & Nickelodeon'' Super Toon', 25, 'Boston, Massachusetts', '77Kkd6UM6ggnTbZxR3NMG3uieP73'),
(2, 'https://firebasestorage.googleapis.com/v0/b/retro-haven.appspot.com/o/items%2Fwitchesbundel.jpeg?alt=media&token=85ad3048-86b5-4ad5-ab36-fa339179d29d', 'WitchFire & The Witches VHS Bundle', 'WitchFire & The Witches VHS Bundle', 20, 'Boston, Massachusetts', '77Kkd6UM6ggnTbZxR3NMG3uieP73'),
(2, 'https://firebasestorage.googleapis.com/v0/b/retro-haven.appspot.com/o/items%2Fstarwars.jpeg?alt=media&token=6d162b00-5b00-4412-987d-6829ac399ed3', 'Star Wars Trilogy VHS tapes', 'Star Wars Trilogy - New Hope, Empire Strikes Back, & Return of the Jedi - Tested. Condition is "Very Good". Two are still sealed on the bottom.', 20, 'eltingville, staten island', '77Kkd6UM6ggnTbZxR3NMG3uieP73'),
(2, 'https://firebasestorage.googleapis.com/v0/b/retro-haven.appspot.com/o/items%2Frescuehereos.jpeg?alt=media&token=9fca27b0-eecc-4a87-b618-d87a6de13877', 'Rescue Heroes VHS Bundle', 'Rescue Heroes VHS tapes Bundle', 15, 'astoria, queens', '77Kkd6UM6ggnTbZxR3NMG3uieP73'),
(2, 'https://firebasestorage.googleapis.com/v0/b/retro-haven.appspot.com/o/items%2Fyugioh.jpeg?alt=media&token=eb46d8dc-b35e-499f-b6fd-cb3a956a9411', 'Yu Gi Oh! VHS Bundle ', 'Yu Gi Oh! VHS Bundle: The Heart Of The Cards, Give Up The Ghost & Duel Identity', 20, 'korea town, manhattan', '8fFWde4Em6S0JjYSeAV2v489Qxu2'),
(2, 'https://firebasestorage.googleapis.com/v0/b/retro-haven.appspot.com/o/items%2Fjurassic.jpeg?alt=media&token=63305cfb-28fc-4606-b8d5-ab9de4354e64', 'Jurassic Park & Jaws VHS Duo Bundle ', 'Jurassic Park & Jaws VHS due bundle ', 15, 'ridgewood, queens', '8fFWde4Em6S0JjYSeAV2v489Qxu2'),
(3, 'https://firebasestorage.googleapis.com/v0/b/retro-haven.appspot.com/o/items%2Fbeaniebear.jpeg?alt=media&token=c2ba7bc1-a7eb-4022-ab80-8a32e8f5dd40', 'TY Beanie Baby - Eggs 2005 the Bear ', 'TY Beanie Baby - Eggs 2005 the Bear - Great Condition w/ Tags. Condition is "Used".', 10, 'bronx', '8fFWde4Em6S0JjYSeAV2v489Qxu2'),
(3, 'https://firebasestorage.googleapis.com/v0/b/retro-haven.appspot.com/o/items%2Fghostbeard.jpeg?alt=media&token=de1043f1-ef22-4780-b44e-7b4de449a2c7', 'TY Beanie Baby - Spooky the Ghost', 'TY Beanie Baby - Spooky the Ghost - Great Condition w/ Tags', 10, 'bay ridge, brooklyn', '8fFWde4Em6S0JjYSeAV2v489Qxu2'),
(3, 'https://firebasestorage.googleapis.com/v0/b/retro-haven.appspot.com/o/items%2Fminiarcade.jpeg?alt=media&token=826e1f49-c8d7-4c8c-bdaa-f46d00e64e6c', 'Pac-Man - Handheld Mini Arcade', 'Pac-Man - Handheld Mini Arcade Machine - Tested', 10, 'canarsie, brooklyn', '8fFWde4Em6S0JjYSeAV2v489Qxu2'),
(3, 'https://firebasestorage.googleapis.com/v0/b/retro-haven.appspot.com/o/items%2FbearBeanie.jpeg?alt=media&token=0ec476ce-4d59-4b9e-a0bb-65b83892d244', 'TY Beanie Baby - 1999 Signature Bear', 'TY Beanie Baby - 1999 Signature Bear - Great Condition w/ Tags', 10, 'cobble hill, brooklyn', '8fFWde4Em6S0JjYSeAV2v489Qxu2'),
(3, 'https://firebasestorage.googleapis.com/v0/b/retro-haven.appspot.com/o/items%2Fleopardbeanie.jpeg?alt=media&token=14862bca-8831-492b-92a5-f1e6d1b2218c', 'TY Beanie Baby - Blizzard the Snow Leopard', 'TY Beanie Baby - Blizzard the Snow Leopard- Great Condition w/ Tags', 10, 'hells kitchen, manhattan', '8fFWde4Em6S0JjYSeAV2v489Qxu2'),
(3, 'https://firebasestorage.googleapis.com/v0/b/retro-haven.appspot.com/o/items%2Fluigicube.jpeg?alt=media&token=a61e3ccd-9627-4169-b2d4-cd30c02a069b', 'Super Mario Bros. Toys', 'Super Mario Bros. Toys - Luigi Launcher & Rubix Cube', 10, 'long island city, queens', '8fFWde4Em6S0JjYSeAV2v489Qxu2');
