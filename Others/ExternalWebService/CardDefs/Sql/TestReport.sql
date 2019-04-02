BEGIN
	SELECT [Description]
	FROM [dbo].[dvsys_instances]
	WHERE InstanceID = @CardId
END