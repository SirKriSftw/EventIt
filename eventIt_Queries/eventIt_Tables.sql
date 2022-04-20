DROP Table Plans, Users
create table Users(
	userID int primary key,
	email varchar(100) unique NOT NULL,
	password varchar(100) NOT NULL,
	name varchar(100) NOT NULL,

	constraint chk_password check(LEN(password) >= 8),
	constraint chk_name check(LEN(name) >= 3)
)

create table Plans(
	planID int primary key,
	userID int foreign key REFERENCES Users(userID) ON DELETE CASCADE,
	planDateStart datetime,
	planDateEnd datetime,
	details varchar(MAX),

	constraint chk_date check(planDateStart < planDateEnd)
)

SELECT * FROM Users

SELECT * FROM Users
SELECT * FROM Plans
SELECT * FROM Logs WHERE Level = 'Error'