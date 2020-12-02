import { Flex } from "@chakra-ui/react";
import CheckoutCard from "./CheckoutCard";

export default function Checkout(): JSX.Element {
  return (
    <Flex maxW="1133px" w="100%" flexDir="column">
      <h1>Product Card</h1>
      <CheckoutCard productId="1"></CheckoutCard>
      <CheckoutCard productId="2"></CheckoutCard>
    </Flex>
  )
}