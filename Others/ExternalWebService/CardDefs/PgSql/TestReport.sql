$$
BEGIN
	RETURN query
	SELECT "Description"
	FROM public."dvsys_instances"
	WHERE "InstanceID" = val_CardId;
END;
$$
LANGUAGE plpgsql volatile;