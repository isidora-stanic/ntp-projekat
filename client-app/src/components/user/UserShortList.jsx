import React from "react";
import ReactPaginate from "react-paginate";
import "../product/ProductShortList.css";
import UserShort from './UserShort'

const UserShortList = ({ users, total, pageSize, pageNum, setPageNum }) => {
  const handlePageClick = (e) => {
    setPageNum(e.selected + 1);
  };
  return (
    <div
      style={{
        display: "inline-block",
        margin: "3rem",
        border: "solid 0.2rem lightblue",
        borderRadius: "0.2rem",
        width: "60%",
        heigth: "60%",
        padding: "1rem",
        overflowWrap: "break-word",
      }}
    >
      {/* <div>Total: {total}</div> */}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Role</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((p) => (
            <UserShort key={p.id} user={p} />
          ))}
        </tbody>
      </table>
      {/* <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={total / pageSize}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={"paging"}
        previouslinkClassName={"paging__link"}
        nextLinkClassName={"paging__link"}
        disabledClassName={"paging__link--disabled"}
        activeClassName={"paging__link--active"}
      /> */}
      {/* todo: promeni komponentu */}
    </div>
  );
};

export default UserShortList;
