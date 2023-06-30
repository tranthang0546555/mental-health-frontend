pragma solidity ^0.8.9;

contract MedicalRecord {
    event CreateRecord(address sender, uint id);
    struct Record {
        uint id;
        string data;
        string userId;
        string doctorId;
        bool isDeleted;
    }

    Record[] private records;
    mapping(uint => address) recordToOwner;

    function createRecord(string memory data) external {
        uint id = records.length;
        records.push(Record(id, data, "userId", "doctorId", false));
        recordToOwner[id] = msg.sender;
        emit CreateRecord(msg.sender, id);
    }

    function getAll() external view returns (Record[] memory) {
        Record[] memory temporary = new Record[](records.length);
        uint counter = 0;
        for (uint i = 0; i < records.length; i++) {
            if (records[i].isDeleted == false) {
                temporary[counter] = records[i];
                counter++;
            }
        }

        Record[] memory result = new Record[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }
}
