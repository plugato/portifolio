import { Box, Heading } from '@chakra-ui/layout';

const Header = () => {
  return (
    <Box>
      <Heading as="h1" size="4xl" isTruncated>
        Header
      </Heading>
    </Box>
  );
};

export default Header;
