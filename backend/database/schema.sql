create table user (
  id int primary key auto_increment not null,
  username varchar(50) not null,
  email varchar(50) not null,
  password varchar(255) not null,
  avatar varchar(100) not null,
  color varchar(50) not null
);

create table message (
  id int primary key auto_increment not null,
  content tinytext not null,
  message_date timestamp,
  user_id int not null,
  constraint FK_UserMessage foreign key (user_id)
  references user(id)
);
