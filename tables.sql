create table login(idUser int auto_increment, user varchar(255), password varchar(255), primary key (idUser));
insert into login(user, password) values ('Juan','123');

create table infoAlumnos(idUser int auto_increment ,semestre int, imagen varchar(255) ,materiasFav varchar(255), maestrosFav varchar(255), tecUni varchar(255), ciudad varchar(255), email varchar(255) ,numTel varchar(255), cumple varchar(255), foreign key(idUser) references login(idUser));
insert into infoAlumnos(semestre, imagen ,materiasFav, maestrosFav, tecUni, ciudad, email, numTel, cumple) values (6, 'http://localhost:3000/profilePic/zelda.jpg', 'Redes', 'maestrosFav', 'TEC', 'Vallarta', 'lizarraga@gmail.com','322', 'un dia');
