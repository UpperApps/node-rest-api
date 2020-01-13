create table appointment (
    id int not null AUTO_INCREMENT,
    client varchar(50) not null,
    pet varchar(20),
    service varchar(20) not null,
    status varchar(20) not null,
    observations text,
    PRIMARY KEY(id)
)