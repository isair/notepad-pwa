import * as checkInstalled from "@/utils/checkInstalled"
// @ponicode
describe("checkInstalled.default", () => {
    test("0", () => {
        let callFunction: any = () => {
            checkInstalled.default()
        }
    
        expect(callFunction).not.toThrow()
    })
})
