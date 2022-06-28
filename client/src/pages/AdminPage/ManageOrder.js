import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, ProgressBar, Table } from "react-bootstrap";
function ManageOrder({ orderList, getOrderData }) {
  // modal-status
  const [modalOpen, setModalOpen] = useState(false);
  // order-detail
  const [orderDetail, setOrderDetail] = useState({});

  // modal 데이터 임시 저장 변수
  const [tempStatus, setTempStatus] = useState("");

  useEffect(() => {
    getOrderData();
  }, [modalOpen])
  

  const handleRowClick = (orderNum) => {
    const orderDetails = orderList.filter(
      (order) => order.orderNumber === orderNum
    );
    setOrderDetail(orderDetails[0]);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setTempStatus("");
  };

  const handleModalSave = () => {
    // 주문상태 변경 요청(저장)
    updateOrderStatus(orderDetail.orderNumber, tempStatus);
    setModalOpen(false);
  };

  const updateOrderStatus = async (orderId, status) => {
    const result = await axios.post(`info/update-order-status`, {
      data: { orderNumber: orderId, new_status: status },
    });
    console.log("주문 현황 변경 요청 결과 : ", result);
  };

  const setProgressBar = (step) => {
    let percentage = 0;
    if (step === "request") {
      percentage = 25;
    } else if (step === "accept") {
      percentage = 50;
    } else if (step === "fixedDate") {
      percentage = 75;
    } else if (step === "delivered") {
      percentage = 100;
    }
    return percentage;
  };

  return (
    <section>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>주문일시</th>
            <th>주문자명</th>
            <th>이메일</th>
            <th>제품</th>
            <th>수량</th>
            <th>지불금액</th>
            <th>주문상태</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((data, index) => {
            return (
              <tr
                key={index}
                onClick={() => handleRowClick(data.orderNumber)}
                className={`cursor-pointer ${
                  data.status === "delivered" || data.status === "canceled"
                    ? "text-muted"
                    : ""
                }`}
              >
                <td>{data.orderdate}</td>
                <td>{data.username}</td>
                <td>{data.userEmail}</td>
                <td>
                  {data.itemList.split(",").map((data, index) => {
                    if (data !== "") {
                      return <p key={index}>{data}</p>;
                    } else {
                      return "";
                    }
                  })}
                </td>
                <td>
                  {data.quantityList.split(",").map((data, index) => {
                    if (data !== "") {
                      return <p key={index}>{data}</p>;
                    } else {
                      return "";
                    }
                  })}
                </td>
                <td>{data.price} ❤️</td>
                <td>
                  {data.status}
                  <ProgressBar
                    variant="warning"
                    now={setProgressBar(data.status)}
                    label=""
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* modal */}
      <Modal show={modalOpen} onHide={handleModalClose} size="lg">
        <Modal.Header>
          <Modal.Title>주문번호 : {orderDetail.orderNumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* 주문 상태는 주문 접수 전|배송 날짜 조정 중|배송 예정일 전달 완료|배송 완료*/}
          <h3>현재 주문 상태 : {orderDetail.status}</h3>
          <br />
          <Table bordered responsive className="text-center align-middle">
            <thead>
              <tr>
                <th width="25%">신규 주문{<br />}request</th>
                <th width="25%">배송 날짜 조정 중{<br />}accept</th>
                <th width="25%">배송 예정일 전달 완료{<br />}fixedDate</th>
                <th width="25%">배송 완료{<br />}delivered</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4}>
                  <ProgressBar
                    animated
                    variant="warning"
                    now={setProgressBar(
                      !tempStatus ? orderDetail.status : tempStatus
                    )}
                    label=""
                  />
                </td>
              </tr>
              <tr>
                <td>✔️</td>
                <td>
                  {orderDetail.status === "request" ? (
                    <Button
                      variant="dark"
                      onClick={() => setTempStatus("accept")}
                      disabled={tempStatus === "accept" ? true : false}
                    >
                      진행
                    </Button>
                  ) : orderDetail.status === "accept" ||
                    orderDetail.status === "fixedDate" ||
                    orderDetail.status === "delivered" ? (
                    "✔️"
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  {orderDetail.status === "accept" ? (
                    <Button
                      variant="dark"
                      onClick={() => setTempStatus("fixedDate")}
                      disabled={tempStatus === "fixedDate" ? true : false}
                    >
                      진행
                    </Button>
                  ) : orderDetail.status === "delivered" ||
                    orderDetail.status === "fixedDate" ? (
                    "✔️"
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  {orderDetail.status === "fixedDate" ? (
                    <Button
                      variant="dark"
                      onClick={() => setTempStatus("delivered")}
                      disabled={tempStatus === "delivered" ? true : false}
                    >
                      진행
                    </Button>
                  ) : orderDetail.status === "delivered" ? (
                    "✔️"
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            닫기
          </Button>
          {tempStatus ? (
            <Button variant="primary" onClick={handleModalSave}>
              저장 후 닫기
            </Button>
          ) : (
            ""
          )}
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default ManageOrder;
