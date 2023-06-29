import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MedicalRecord from "./MedicalRecord.json";

export default function useContract() {
  const [contract, setContract] = useState<ethers.Contract>();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return toast.error("Chưa cài đặt ví Metamask");
      const provider = new ethers.providers.Web3Provider(ethereum);

      const chainId = await ethereum.request({ method: "eth_chainId" });

      const goerliChainId = "0x5";
      if (chainId !== goerliChainId)
        return toast.warn("Mạng thử nghiệm Goerly chưa được chọn");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts[0])
        return toast.warn("Bạn cần đăng nhập ví Metamask để tiếp tục");

      const signer = provider.getSigner();

      const MedicalRecordContract = new ethers.Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        MedicalRecord.abi,
        signer
      );

      setContract(MedicalRecordContract);
    } catch (error: any) {
      toast.error(error.message);
      console.log("Connect error", error);
    }
  };

  const funcs = contract && {
    getMedicalRecord: async (id: number) => await contract.getMedicalRecord(id),
    getRecordsbyDoctorId: async (doctorId: string) =>
      await contract.getRecordsbyDoctorId(doctorId),
    createMedicalRecord: async (
      data: string,
      userId: string,
      doctorId: string
    ) => await contract.createMedicalRecord(data, userId, doctorId),
    getRecordsbyUserId: async (id: string) =>
      await contract.getRecordsbyUserId(id),
  };

  return funcs;
}
