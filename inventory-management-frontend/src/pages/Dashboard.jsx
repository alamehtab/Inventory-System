import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import SummaryCards from "../components/SummaryCards";
import InventoryTable from "../components/InventoryTable";
import LedgerTable from "../components/LedgerTable";
import {
    getInventory,
    getLedger,
    resetInventory
} from "../services/dashboard.service";
import { simulateKafka } from "../services/kafka.service";

const Dashboard = () => {
    const [inventory, setInventory] = useState([]);
    const [ledger, setLedger] = useState([]);
    const [loading, setLoading] = useState(true);
    const [simulating, setSimulating] = useState(false);
    const loadDashboard = async (showLoader = false) => {
        try {
            if (showLoader) {
                setLoading(true);
            }
            const [inventoryResponse, ledgerResponse] =
                await Promise.all([
                    getInventory(),
                    getLedger()
                ]);
            setInventory(inventoryResponse.data);
            setLedger(ledgerResponse.data);
        } catch (error) {
            console.error(error);
        } finally {
            if (showLoader) {
                setLoading(false);
            }
        }
    };
    const handleSimulation = async () => {
        try {
            setSimulating(true);
            await simulateKafka();
            await loadDashboard();
        } catch (error) {
            console.error(error);
            alert("Failed to simulate Kafka events.");
        } finally {
            setSimulating(false);
        }
    };
    const handleReset = async () => {
        try {
            await resetInventory();
            await loadDashboard();
            alert("Inventory reset successfully");
        }
        catch (error) {
            console.error(error);
            alert("Reset failed");
        }
    };
    useEffect(() => {
        loadDashboard(true);
        const interval = setInterval(() => {
            loadDashboard();
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    if (loading) {
        return <Loader />;
    }
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-7xl mx-auto p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Inventory Dashboard
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Inventory updates automatically every 5 seconds.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handleSimulation}
                            disabled={simulating}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg"
                        >
                            {
                                simulating
                                    ?
                                    "Generating Events..."
                                    :
                                    "Simulate Kafka Events"
                            }
                        </button>
                        <button
                            onClick={handleReset}
                            className="bg-red-600 text-white px-6 py-3 rounded-lg"
                        >
                            Reset Data
                        </button>
                    </div>
                </div>
                <SummaryCards inventory={inventory} />
                <InventoryTable inventory={inventory} />
                <LedgerTable ledger={ledger} />
            </div>
        </div>
    );
};

export default Dashboard;