import { Flex } from '@chakra-ui/layout';
import Header from '../components/Header';
import Home from './home';

const Index = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="space-around"
      h="500px"
    >
      <Header></Header>
      <Home></Home>
    </Flex>
  );
};

export default Index;
