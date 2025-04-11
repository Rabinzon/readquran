-- Up Migration
create table translation (
    id serial primary key,
    author varchar(256) not null,
    created_at timestamp default current_timestamp
);

create table if not exists chapter (
    id serial primary key,
    name varchar(256) not null,
    chronological_order integer not null,
    created_at timestamp default current_timestamp
);

create table if not exists verse (
    id serial primary key,
    text text not null,
    position integer not null,
    translation_id integer not null references translation(id),
    chapter_id integer not null references chapter(id),
    created_at timestamp default current_timestamp
);

create unique index if not exists idx_verse_chapter_position_translation on verse(chapter_id, position, translation_id);
create index if not exists idx_verse_text_vector on verse using gin(to_tsvector('russian', text));

create table if not exists topic (
    id serial primary key,
    name varchar(512) not null,
    created_at timestamp default current_timestamp
);

create table if not exists topic_verse (
    topic_id integer not null references topic(id),
    verse_id integer not null references verse(id),
    primary key (topic_id, verse_id)
);

-- Down Migration
drop table if exists topic_verse;
drop table if exists topic;

drop index if exists idx_verse_text_vector;
drop index if exists idx_verse_chapter_position_translation;

drop table if exists verse;
drop table if exists chapter;
drop table if exists translation;
