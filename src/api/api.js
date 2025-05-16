export const getSpreadSheetData = async () => {
    var response = await fetch("https://sheetdb.io/api/v1/slcbdmb4n0ps2", {
        method : "GET",
        headers: {
			'content-type': 'application/json;charset=UTF-8',
		}
    });

    const { data, errors } = await response.json()
	if (response.ok) {
		const sheetData = data;
		return sheetData;
	} else {
		// handle the graphql errors
		const error = new Error(
			errors?.map((e) => e.message).join('\n') ?? 'unknown',
		)
		return Promise.reject(error);
	}
};