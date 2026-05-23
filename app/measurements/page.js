"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import AddShirt from "../components/addShirt";
import AddPant from "../components/addPant";
import EditShirt from "../components/editShirt";
import EditPant from "../components/editPant";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getShirtMeasurementsCustomerId } from "../redux/actions/measurementAction";
import { getPantMeasurementsCustomerId } from "../redux/actions/pantMeasurementAction";
import { api } from "../utils/api";
import Swal from "sweetalert2";

export default function Measurements() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId");
  const [activeTab, setActiveTab] = useState("Pending");
  const [isAddShirtModalOpen, setIsAddShirtModalOpen] = useState(false);
  const [isAddPantModalOpen, setIsAddPantModalOpen] = useState(false);
  const [isEditShirtModalOpen, setIsEditShirtModalOpen] = useState(false);
  const [isEditPantModalOpen, setIsEditPantModalOpen] = useState(false);
  const [editingMeasurement, setEditingMeasurement] = useState(null);
  const [user, setUser] = useState(null);

  const dispatch = useAppDispatch();
  const userMeasurementinfo = useAppSelector(
    (state) => state.customerMeasurement?.userMeasurementinfo,
  );
  const userPantMeasurementinfo = useAppSelector(
    (state) => state.pantMeasurement?.userPantMeasurementinfo,
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const tabs = [
    { id: "Pending", label: "Pending" },
    { id: "Inprogress", label: "Inprogress" },
    { id: "Done", label: "Done" },
  ];
  useEffect(() => {
    if (!customerId) return;
    dispatch(getShirtMeasurementsCustomerId(customerId));
    dispatch(getPantMeasurementsCustomerId(customerId));
  }, [customerId, dispatch]);

  // Debug: Log the measurements data

  const addShirt = () => {
    setIsAddShirtModalOpen(true);
  };

  const handleCloseAddShirtModal = () => {
    setIsAddShirtModalOpen(false);
  };

  const handleAddShirtSuccess = async () => {
    await dispatch(getShirtMeasurementsCustomerId(customerId));
    await dispatch(getPantMeasurementsCustomerId(customerId));
    await Swal.fire({
      title: "Success!",
      text: "Shirt added successfully",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const handleEditMeasurement = (measurement) => {
    setEditingMeasurement(measurement);
    if (measurement.neck) {
      setIsEditShirtModalOpen(true);
    } else {
      setIsEditPantModalOpen(true);
    }
  };

  const handleCloseEditShirtModal = () => {
    setIsEditShirtModalOpen(false);
    setEditingMeasurement(null);
  };

  const handleCloseEditPantModal = () => {
    setIsEditPantModalOpen(false);
    setEditingMeasurement(null);
  };

  const handleEditShirtSuccess = async () => {
    if (customerId) {
      await dispatch(getShirtMeasurementsCustomerId(customerId));
      await dispatch(getPantMeasurementsCustomerId(customerId));
      await await Swal.fire({
        title: "Success!",
        text: "Shirt edited successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const handleEditPantSuccess = async () => {
    if (customerId) {
      await dispatch(getShirtMeasurementsCustomerId(customerId));
      await dispatch(getPantMeasurementsCustomerId(customerId));
      await await Swal.fire({
        title: "Success!",
        text: "Pant edited successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const addPant = () => {
    setIsAddPantModalOpen(true);
  };

  const handleCloseAddPantModal = () => {
    setIsAddPantModalOpen(false);
  };

  const handleAddPantSuccess = async () => {
    if (customerId) {
      await dispatch(getShirtMeasurementsCustomerId(customerId));
      await dispatch(getPantMeasurementsCustomerId(customerId));
      await Swal.fire({
        title: "Success!",
        text: "Shirt added successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDeleteMeasurement = async (measurement) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this measurement",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      const endpoint = measurement?.neck
        ? "/api/shirt-measurements"
        : "/api/pant-measurements";

      const data = await api.post(endpoint, {
        action: "delete",
        id: measurement._id,
      });

      if (data.success) {
        if (customerId) {
          dispatch(getShirtMeasurementsCustomerId(customerId));
          dispatch(getPantMeasurementsCustomerId(customerId));
        }
        await Swal.fire("Deleted!", "Measurement deleted successfully.", "success");
      } else {
        await Swal.fire("Error", data.message || "Failed to delete measurement", "error");
      }
    } catch (error) {
      await Swal.fire("Network error", "Please try again.", "error");
    }
  };

  const renderTabContent = () => {
    if (
      !userMeasurementinfo?.measurements &&
      !userPantMeasurementinfo?.measurements
    ) {
      return (
        <div className="p-6">
          <p className="text-gray-600">Loading measurements...</p>
        </div>
      );
    }

    const shirtMeasurements =
      userMeasurementinfo?.measurements?.filter(
        (measurement) => measurement.status === activeTab,
      ) || [];

    const pantMeasurements =
      userPantMeasurementinfo?.measurements?.filter(
        (measurement) => measurement.status === activeTab,
      ) || [];

    const allMeasurements = [...shirtMeasurements, ...pantMeasurements];

    if (allMeasurements.length === 0) {
      return (
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {activeTab} Measurements
          </h3>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600">
              No {activeTab.toLowerCase()} measurements at the moment.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">{activeTab} Measurements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {allMeasurements.map((measurement) => (
            <div
              key={measurement._id}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-lg text-gray-800">
                  {measurement.neck ? "Shirt Measurement" : "Pant Measurement"}
                </h4>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      measurement.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : measurement.status === "Inprogress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {measurement.status}
                  </span>
                 {user?.role ==='admin'&&( <div className="flex gap-2">
                    <button
                      className="p-1 cursor-pointer hover:bg-gray-100 rounded"
                      onClick={() => handleEditMeasurement(measurement)}
                    >
                      <Image
                        src="/pen-to-square-solid-full.svg"
                        alt="Edit"
                        width={20}
                        height={20}
                      />
                    </button>
                    <button
                      className="p-1 cursor-pointer hover:bg-red-100 rounded"
                      onClick={() => handleDeleteMeasurement(measurement)}
                    >
                      <Image
                        src="/trash-solid-full.svg"
                        alt="Delete"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>)}
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Expected Date:
                  </span>
                  <span className="text-sm text-gray-900 ml-2">
                    {measurement.date
                      ? new Date(measurement.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })
                      : "Not set"}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  Created:{" "}
                  {new Date(measurement.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </span>
              </div>
              <div className="space-y-2 mt-2">
                {measurement.neck ? (
                  // Shirt measurements
                  <>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Neck:</span>
                        <span className="text-gray-900">
                          {measurement.neck}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">
                          Shoulder:
                        </span>
                        <span className="text-gray-900">
                          {measurement.shoulder}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">
                          Chest:
                        </span>
                        <span className="text-gray-900">
                          {measurement.chest}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">
                          Stomach:
                        </span>
                        <span className="text-gray-900">
                          {measurement.stomach}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">
                          Sleeve Length:
                        </span>
                        <span className="text-gray-900">
                          {measurement.sleeveLength}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">
                          Armhole:
                        </span>
                        <span className="text-gray-900">
                          {measurement.armhole}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">
                          Bicep:
                        </span>
                        <span className="text-gray-900">
                          {measurement.bicep}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">
                          Wrist:
                        </span>
                        <span className="text-gray-900">
                          {measurement.wrist}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">
                          Shirt Length:
                        </span>
                        <span className="text-gray-900">
                          {measurement.shirtLength}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  // Pant measurements
                  <>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">
                          Waist:
                        </span>
                        <span className="text-gray-900">
                          {measurement.waist}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Hip:</span>
                        <span className="text-gray-900">{measurement.hip}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">
                          Thigh:
                        </span>
                        <span className="text-gray-900">
                          {measurement.thigh}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Knee:</span>
                        <span className="text-gray-900">
                          {measurement.knee}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">
                          Bottom:
                        </span>
                        <span className="text-gray-900">
                          {measurement.bottom}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">
                          Length:
                        </span>
                        <span className="text-gray-900">
                          {measurement.length}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Measurements</h1>

        {user?.role === "admin" && (
          <div className="flex gap-4 mb-4">
            <div className="w-48">
              <button
                onClick={() => {
                  addShirt();
                }}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Shirt
              </button>
            </div>

            <div className="w-48">
              <button
                onClick={() => {
                  addPant();
                }}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Pant
              </button>
            </div>
          </div>
        )}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-white rounded-lg shadow">{renderTabContent()}</div>

        {(isAddShirtModalOpen ||
          isAddPantModalOpen ||
          isEditShirtModalOpen ||
          isEditPantModalOpen) && (
          <div>
            {isAddShirtModalOpen && (
              <AddShirt
                customerId={customerId || "default_customer_id"}
                onClose={handleCloseAddShirtModal}
                onSuccess={handleAddShirtSuccess}
              />
            )}
            {isAddPantModalOpen && (
              <AddPant
                customerId={customerId || "default_customer_id"}
                onClose={handleCloseAddPantModal}
                onSuccess={handleAddPantSuccess}
              />
            )}
            {isEditShirtModalOpen && (
              <EditShirt
                measurement={editingMeasurement}
                onClose={handleCloseEditShirtModal}
                onSuccess={handleEditShirtSuccess}
              />
            )}
            {isEditPantModalOpen && (
              <EditPant
                measurement={editingMeasurement}
                onClose={handleCloseEditPantModal}
                onSuccess={handleEditPantSuccess}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
