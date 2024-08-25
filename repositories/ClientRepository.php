<?php
require_once(__DIR__ . '/../database/connection.php');

class ClientRepository
{

    private mysqli $conn;

    public function __construct()
    {
        $this->conn = (new Connection())->getConnection();
    }

    public function insert(string $name, string $phone, string $email): void
    {
        $sql = 'INSERT INTO clients (name, phone, email) VALUES (?, ?, ?)';

        $stmt = $this->conn->prepare($sql);

        $stmt->bind_param('sss', $name, $phone, $email);

        $stmt->execute();

        $stmt->close();
    }

    public function getAll(int $limit = 10, int $offset = 0): array
    {
        $sql = "SELECT * FROM clients LIMIT ? OFFSET ?";

        $stmt = $this->conn->prepare($sql);

        $stmt->bind_param('ii', $limit, $offset);

        $stmt->execute();
        $result = $stmt->get_result();

        $data = [];

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        $stmt->close();
        return $data;
    }

    public function countTotal(): int {
        $sql = "SELECT COUNT(*) AS total FROM clients";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $stmt->close();
    return $row['total'];
    }
    public function __destruct()
    {
        $this->conn->close();
    }
}