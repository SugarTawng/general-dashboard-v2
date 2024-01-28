export const ConvertDateTime = (rawDateTime) => {
	let result = new Date(rawDateTime);
	return result.toLocaleDateString();
};
