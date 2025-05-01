-- Up Migration
update translation set author = 'Кулиев Э. Р. О.' where id = 1;
update translation set author = 'Крачковский И. Ю.' where id = 2;
update translation set author = 'Абу Адель.' where id = 3;
update translation set author = 'Османов М. Н. О.' where id = 4;
update translation set author = 'Порохова В. М.' where id = 5;

-- Down Migration
