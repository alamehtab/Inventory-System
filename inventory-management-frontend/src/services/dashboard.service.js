import api from "../api/axios";

export const getInventory = async () => {
    const response = await api.get(
        "/dashboard/inventory"
    );
    return response.data;
};
export const getLedger = async () => {
    const response = await api.get(
        "/dashboard/ledger"
    );
    return response.data;
};
export const resetInventory = async () => {
    const response = await api.post(
        "/dashboard/reset"
    );
    return response.data;
};