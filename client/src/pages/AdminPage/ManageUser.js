import React from "react";
import { Table } from "react-bootstrap";

const ManageUser = ({userList}) => {
  return (
    <section>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>하트 수</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.nickname}</td>
                <td>{data.email}</td>
                <td>{data.heart}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </section>
  );
}

export default ManageUser;
