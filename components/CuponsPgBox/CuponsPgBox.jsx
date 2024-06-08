import { ListItem, UnorderedList } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { couponsActions } from "../../store/actions";
import { isEmpty } from "lodash";

function CuponsPgBox({ data, subdomain, getAll, coupons }) {
  const [isLoading, setIsLoading] = useState(false);
  const [couponsData, setCouponsData] = useState([]);

  useEffect(() => {
    if (isEmpty(coupons)) {
      setCouponsData([]);
      setIsLoading(false);
      getAll(data.user_id);
    }
  }, []);

  useEffect(() => {
    if (coupons.items) {
      setCouponsData(coupons.items);
      setIsLoading(false);
    } else {
      setCouponsData([]);
    }

    if (coupons.loading) {
      setIsLoading(coupons.loading);
    }
  }, [coupons]);

  if (isLoading) {
    return null;
  }

  return (
    <UnorderedList ml="45px" mt="10px">
      {couponsData.map((payment, key) => (
        <ListItem fontSize="14px" fontWeight={500} key={key}>
          {payment.nome} 
        </ListItem>
      ))}
    </UnorderedList>
  );
}

function mapState(state) {
  const { coupons } = state;
  return { coupons };
}

const actionCreators = {
  getAll: couponsActions.getAll,
};

export default connect(mapState, actionCreators)(CuponsPgBox);
