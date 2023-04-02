create database files_db;

create table files(
	file_id int not null auto_increment primary key,
    file_name varchar(255),
    file_size int,
    upload_date datetime default CURRENT_TIMESTAMP 
)