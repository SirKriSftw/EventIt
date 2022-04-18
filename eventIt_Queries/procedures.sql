DROP PROCEDURE addPlan, addUser
-- Procedure to add a user, returns userID
create procedure addUser(@email varchar(100), @password varchar(100), @name varchar(100), @userID int output)
as
begin
	-- Set userID to current max ID + 1
	set @userID = (SELECT MAX(userID)+1 FROM Users)
	-- If there were no other users, it would be null so set to 1
	if (@userID is null)	
		set @userID = 1 
	-- Insert user
	insert into Users values(@userID, @email, @password, @name)
end

-- Procedure to add a plan return planID is successful and -1 if unsucessful
create procedure addPlan(@userID int, @planDateStart datetime, @planDateEnd datetime, @details varchar(MAX), @planID int output)
as
begin
	-- Set ID to current max ID + 1
	set @planID = (SELECT MAX(planID)+1 FROM Plans)
	-- If there were no other plans, it would be null so set to 1
	if (@planID is null)
		set @planID = 1
	-- Check start is after end
	if (@planDateStart < @planDateEnd)
	begin
		declare @overlap int
		-- Check for plan overlap for given user
		set @overlap = 
		(
			select MAX(planID) from Plans where userID = @userID 
			and  
			(
			(planDateStart <= @planDateStart and planDateEnd > @planDateStart) 
			or 
			(planDateStart >= @planDateStart and planDateStart <= @planDateEnd)
			)
		)
		-- If no overlap, insert plan and return planID
		if (@overlap is null)
			insert into Plans values(@planID, @userID, @planDateStart, @planDateEnd, @details)
		-- If overlap, do not insert plan and return -1
		else
			set @planID = -1
	end
	-- If start is AFTER end return -1 and do not insert
	else
		set @planID = -1
end

-- Procedure to update a plan, returns 1 if sucessful and 0 if unsucessful
create procedure updatePlan(@planID int, @planDateStart datetime, @planDateEnd datetime, @details varchar(MAX), @result bit output)
as
begin
	-- First check start is before end
	if (@planDateStart < @planDateEnd)
	begin
		declare @overlap int
		declare @userID int
		-- Get user asscoaited with plan to be updated
		set @userID = (select userID from Plans where planID = @planID)
		-- Check for any plan overlap for given user that is NOT the current plan being updated
		set @overlap = 
		(
			select MAX(planID) from Plans where userID = @userID and planID != @planID
			and  
			(
			(planDateStart <= @planDateStart and planDateEnd > @planDateStart) 
			or 
			(planDateStart >= @planDateStart and planDateStart <= @planDateEnd)
			)
		)
		-- If no overlap, update and return 1
		if (@overlap is null)
		begin
			update Plans SET planDateStart = @planDateStart, planDateEnd = @planDateEnd, details = @details WHERE planID = @planID
			set @result = 1
		end
		-- If overlap, return 0
		else
			set @result = 0
	end
	-- If end is before start return 0
	else
		set @result = 0
end

-- Procedure tests ---------------------------------------------------------------------------------------------------------
declare @result int;
exec addUser 'test@email', '12345678', 'test', @result output
print(@result)

SELECT * FROM Users


declare @result int;
exec addPlan 1,'4/16/2022 4:00', '4/16/2022 5:00', 'testing plan', @result output
print(@result)

SELECT * FROM Plans


declare @result bit;
exec updatePlan 1,'4/15/2022 4:00', '4/15/2022 5:00', 'testing plan2', @result output
print(@result)

SELECT * FROM Plans

