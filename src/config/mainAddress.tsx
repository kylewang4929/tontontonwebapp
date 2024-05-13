import { Address } from "ton-core"

const MAIN_ADDRESS = '0QCIm3WgRnm4nQd95DYFk_UxIHnNTsv5-A4JqK6wyHIHDLN2'
const TEST_ADDRESS = '0QCIm3WgRnm4nQd95DYFk_UxIHnNTsv5-A4JqK6wyHIHDLN2'
const rawString = Address.parse(TEST_ADDRESS).toRawString();
export default rawString