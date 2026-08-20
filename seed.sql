-- Auto-generated from lib/menu-data.ts — the Wawu Meals bowls menu PDF.
-- Safe to re-run: upserts on conflict.

insert into categories (id, name, note, display_order) values ('rice', 'Rice', null, 1)
  on conflict (id) do update set name = excluded.name, note = excluded.note, display_order = excluded.display_order;
insert into categories (id, name, note, display_order) values ('soup', 'Soup', null, 2)
  on conflict (id) do update set name = excluded.name, note = excluded.note, display_order = excluded.display_order;
insert into categories (id, name, note, display_order) values ('pasta', 'Pasta', null, 3)
  on conflict (id) do update set name = excluded.name, note = excluded.note, display_order = excluded.display_order;
insert into categories (id, name, note, display_order) values ('stews-sauces', 'Stews & Sauces', null, 4)
  on conflict (id) do update set name = excluded.name, note = excluded.note, display_order = excluded.display_order;
insert into categories (id, name, note, display_order) values ('peppersoup', 'Peppersoup', null, 5)
  on conflict (id) do update set name = excluded.name, note = excluded.note, display_order = excluded.display_order;
insert into categories (id, name, note, display_order) values ('other', 'Other Dishes', null, 6)
  on conflict (id) do update set name = excluded.name, note = excluded.note, display_order = excluded.display_order;
insert into categories (id, name, note, display_order) values ('proteins', 'Proteins', 'Sold by portion — add these on to any soup, rice or pottage', 7)
  on conflict (id) do update set name = excluded.name, note = excluded.note, display_order = excluded.display_order;

insert into menu_items (id, category_id, name, description, display_order) values ('rice-basmati-jollof', 'rice', 'Basmati Jollof Rice', null, 1)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'rice-basmati-jollof';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-basmati-jollof', '1.5L', 25000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-basmati-jollof', '2.5L', 50000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-basmati-jollof', '3.5L', 70000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-basmati-jollof', '5L', 90000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('rice-basmati-fried', 'rice', 'Basmati Fried Rice', null, 2)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'rice-basmati-fried';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-basmati-fried', '1.5L', 30000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-basmati-fried', '2.5L', 60000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-basmati-fried', '3.5L', 80000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-basmati-fried', '5L', 110000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('rice-seafood-fried', 'rice', 'Seafood Fried Rice', 'Prawns, snails and fish', 3)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'rice-seafood-fried';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-seafood-fried', '1.5L', 45000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-seafood-fried', '2.5L', 70000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-seafood-fried', '3.5L', 95000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-seafood-fried', '5L', 125000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('rice-native', 'rice', 'Native Rice', 'Snail, prawns, fish, egg, assorted and pomo', 4)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'rice-native';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-native', '1.5L', 40000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-native', '2.5L', 60000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-native', '3.5L', 80000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-native', '5L', 120000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('rice-coconut', 'rice', 'Coconut Rice', 'Diced turkey or goat meat and smoked fish', 5)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'rice-coconut';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-coconut', '1.5L', 40000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-coconut', '2.5L', 65000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-coconut', '3.5L', 85000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-coconut', '5L', 115000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('rice-seafood-coconut', 'rice', 'Seafood Coconut Rice', 'Snails, prawns and fish', 6)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'rice-seafood-coconut';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-seafood-coconut', '1.5L', 55000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-seafood-coconut', '2.5L', 85000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-seafood-coconut', '3.5L', 100000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('rice-seafood-coconut', '5L', 130000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('soup-afang', 'soup', 'Afang Soup', 'Goat meat or beef, assorted, pomo, smoked fish', 1)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'soup-afang';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-afang', '1.5L', 40000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-afang', '2.5L', 60000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-afang', '3.5L', 80000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-afang', '5L', 100000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('soup-edikang-ikong', 'soup', 'Edikang-Ikong', 'Goat meat or beef, assorted, pomo, periwinkle and smoked fish', 2)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'soup-edikang-ikong';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-edikang-ikong', '1.5L', 40000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-edikang-ikong', '2.5L', 60000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-edikang-ikong', '3.5L', 80000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-edikang-ikong', '5L', 100000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('soup-ogbono', 'soup', 'Ogbono Soup', 'Goat meat or beef, assorted, pomo, periwinkle and smoked fish', 3)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'soup-ogbono';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-ogbono', '1.5L', 45000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-ogbono', '2.5L', 65000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-ogbono', '3.5L', 85000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-ogbono', '5L', 110000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('soup-egusi', 'soup', 'Egusi', 'Goat meat or beef, assorted, pomo and smoked fish', 4)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'soup-egusi';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-egusi', '1.5L', 45000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-egusi', '2.5L', 65000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-egusi', '3.5L', 85000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-egusi', '5L', 110000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('soup-efo-riro', 'soup', 'Efo Riro', 'Goat meat or beef, assorted, pomo, fish, smoked fish', 5)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'soup-efo-riro';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-efo-riro', '1.5L', 40000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-efo-riro', '2.5L', 60000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-efo-riro', '3.5L', 80000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-efo-riro', '5L', 100000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('soup-oha', 'soup', 'Oha Soup', 'Goat meat or beef, assorted, pomo, smoked fish', 6)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'soup-oha';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-oha', '1.5L', 40000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-oha', '2.5L', 60000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-oha', '3.5L', 80000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-oha', '5L', 100000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('soup-banga', 'soup', 'Banga Soup', 'Goat meat or beef, assorted, pomo, smoked fish', 7)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'soup-banga';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-banga', '1.5L', 40000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-banga', '2.5L', 60000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-banga', '3.5L', 80000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-banga', '5L', 100000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('soup-seafood-banga', 'soup', 'Seafood Banga Soup', 'Snails, prawns, cat fish and periwinkle', 8)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'soup-seafood-banga';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-seafood-banga', '1.5L', 55000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-seafood-banga', '2.5L', 85000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-seafood-banga', '3.5L', 100000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-seafood-banga', '5L', 120000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('soup-seafood-okro', 'soup', 'Seafood Okro', 'Fish, snails, crab, calamari, periwinkle', 9)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'soup-seafood-okro';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-seafood-okro', '1.5L', 50000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-seafood-okro', '2.5L', 70000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-seafood-okro', '3.5L', 90000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('soup-seafood-okro', '5L', 110000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('pasta-native-spaghetti', 'pasta', 'Native Spaghetti', 'Assorted, smoked fish, snail, egg, pomo, prawns', 1)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'pasta-native-spaghetti';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pasta-native-spaghetti', '1.5L', 45000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pasta-native-spaghetti', '2.5L', 65000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pasta-native-spaghetti', '3.5L', 85000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pasta-native-spaghetti', '5L', 110000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('pasta-jollof-spaghetti', 'pasta', 'Jollof Spaghetti', null, 2)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'pasta-jollof-spaghetti';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pasta-jollof-spaghetti', '1.5L', 30000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pasta-jollof-spaghetti', '2.5L', 60000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pasta-jollof-spaghetti', '3.5L', 80000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pasta-jollof-spaghetti', '5L', 100000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('stew-turkey', 'stews-sauces', 'Turkey Stew', null, 1)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'stew-turkey';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-turkey', '1.5L', 45000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-turkey', '2.5L', 65000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-turkey', '3.5L', 85000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-turkey', '5L', 110000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('stew-chicken', 'stews-sauces', 'Chicken Stew', null, 2)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'stew-chicken';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-chicken', '1.5L', 45000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-chicken', '2.5L', 65000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-chicken', '3.5L', 85000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-chicken', '5L', 110000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('stew-goat-meat', 'stews-sauces', 'Goat Meat Stew', null, 3)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'stew-goat-meat';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-goat-meat', '1.5L', 45000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-goat-meat', '2.5L', 65000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-goat-meat', '3.5L', 85000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-goat-meat', '5L', 110000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('stew-titus', 'stews-sauces', 'Titus Stew', null, 4)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'stew-titus';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-titus', '1.5L', 40000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-titus', '2.5L', 60000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-titus', '3.5L', 80000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-titus', '5L', 100000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('stew-beef', 'stews-sauces', 'Beef Stew', null, 5)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'stew-beef';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-beef', '1.5L', 40000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-beef', '2.5L', 60000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-beef', '3.5L', 80000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('stew-beef', '5L', 100000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('sauce-fish', 'stews-sauces', 'Fish Sauce', null, 6)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'sauce-fish';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('sauce-fish', '1.5L', 45000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('sauce-fish', '2.5L', 65000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('sauce-fish', '3.5L', 85000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('sauce-fish', '5L', 110000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('sauce-ofada', 'stews-sauces', 'Ofada Sauce', null, 7)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'sauce-ofada';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('sauce-ofada', '1.5L', 45000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('sauce-ofada', '2.5L', 65000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('sauce-ofada', '3.5L', 85000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('sauce-ofada', '5L', 110000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('pepper-goat', 'peppersoup', 'Goat Meat Peppersoup', null, 1)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'pepper-goat';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pepper-goat', '1.5L', 30000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pepper-goat', '2.5L', 50000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pepper-goat', '3.5L', 70000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pepper-goat', '5L', 100000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('pepper-assorted', 'peppersoup', 'Assorted Peppersoup', null, 2)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'pepper-assorted';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pepper-assorted', '1.5L', 30000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pepper-assorted', '2.5L', 50000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pepper-assorted', '3.5L', 70000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pepper-assorted', '5L', 100000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('pepper-turkey', 'peppersoup', 'Turkey Peppersoup', null, 3)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'pepper-turkey';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pepper-turkey', '1.5L', 30000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pepper-turkey', '2.5L', 50000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pepper-turkey', '3.5L', 70000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pepper-turkey', '5L', 100000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('pepper-catfish', 'peppersoup', 'Catfish Peppersoup', null, 4)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'pepper-catfish';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pepper-catfish', '1.5L', 25000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pepper-catfish', '2.5L', 40000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pepper-catfish', '3.5L', 55000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('pepper-catfish', '5L', 80000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('other-yam-pottage', 'other', 'Yam Pottage', 'Pomo, smoked fish', 1)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'other-yam-pottage';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('other-yam-pottage', '1.5L', 30000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('other-yam-pottage', '2.5L', 45000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('other-yam-pottage', '3.5L', 60000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('other-yam-pottage', '5L', 85000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('other-beans-pottage', 'other', 'Beans Pottage', 'Cooked with yam or plantain', 2)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'other-beans-pottage';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('other-beans-pottage', '1.5L', 30000, 1);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('other-beans-pottage', '2.5L', 45000, 2);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('other-beans-pottage', '3.5L', 60000, 3);
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('other-beans-pottage', '5L', 85000, 4);

insert into menu_items (id, category_id, name, description, display_order) values ('protein-turkey', 'proteins', 'Turkey', null, 1)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'protein-turkey';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('protein-turkey', 'Standard', 8000, 1);

insert into menu_items (id, category_id, name, description, display_order) values ('protein-chicken-lap', 'proteins', 'Chicken Lap', null, 2)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'protein-chicken-lap';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('protein-chicken-lap', 'Standard', 6000, 1);

insert into menu_items (id, category_id, name, description, display_order) values ('protein-beef', 'proteins', 'Beef', null, 3)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'protein-beef';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('protein-beef', 'Standard', 2500, 1);

insert into menu_items (id, category_id, name, description, display_order) values ('protein-goat-meat', 'proteins', 'Goat Meat', null, 4)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'protein-goat-meat';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('protein-goat-meat', 'Standard', 4500, 1);

insert into menu_items (id, category_id, name, description, display_order) values ('protein-hake-fish', 'proteins', 'Hake Fish', null, 5)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'protein-hake-fish';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('protein-hake-fish', 'Standard', 3000, 1);

insert into menu_items (id, category_id, name, description, display_order) values ('protein-titus-fish', 'proteins', 'Titus Fish', null, 6)
  on conflict (id) do update set name = excluded.name, description = excluded.description, display_order = excluded.display_order;
delete from menu_item_variants where menu_item_id = 'protein-titus-fish';
insert into menu_item_variants (menu_item_id, size_label, price, display_order) values ('protein-titus-fish', 'Standard', 3000, 1);


