import React from 'react'

function OrderComplete() {
  return (
    <main id="order-complete-section">
      <h1>주문 성공!</h1>
      <hr/>
      <p>주문 현황은 <mark>내 정보 {'>'} 주문현황</mark> 에서 확인하실 수 있으며, 배송 날짜가 확정되면 가입할 때 <u>작성한 이메일</u>로 전달됩니다.</p>
    </main>
  )
}

export default OrderComplete