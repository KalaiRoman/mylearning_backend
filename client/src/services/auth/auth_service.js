import instanceBaseurl from "../../middleware/Baseurl";


export async function loginuser(data) {
    try {
        const response = await instanceBaseurl.post("/auth/login", data);
        return response?.data;

    } catch (error) {
        return error;
    }
}