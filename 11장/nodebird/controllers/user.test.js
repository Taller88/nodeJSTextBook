jest.mock('../models/user')
const User = require('../models/user')
const {addFollowing} = require('./user');


describe('addFollowing',()=>{
    
    const res = {
        status:jest.fn(()=>res),
        send:jest.fn()
    };

    const next = jest.fn()
    test('user가 있고 팔로잉을 추가혹 success를 응답한 경우',async ()=>{
        const req = {
            user :{id:"iod1124@naver.com"},
            params:{id:"jinwoo616"}
        };
        
        User.findOne.mockReturnValue(Promise.resolve({
            addFollowing(id){
                return Promise.resolve(true)
            }
        }));
        await addFollowing(req, res, next);
        expect(res.send).toBeCalledWith('success');
        
    })


    test('user가 없는 경우 status 404, send no user로 응답한 경우',async ()=>{
        const req = {
            user :{id:"1"},
            params:{id:"jinwoo616"}
        };
        User.findOne.mockReturnValue(null);
        
       
        await addFollowing(req, res, next);
        expect(res.status).toBeCalledWith(404);
        expect(res.send).toBeCalledWith('no user');

    })

    test('DB에서 오류난 경우 next(err)를 호출',async ()=>{
        const err = new Error('테스트 에러');
        User.findOne.mockReturnValue(Promise.reject(err));
        

        const req = {
            user :{id:"1"},
            params:{id:"jinwoo616"}
        };
        await addFollowing(req, res, next);
        expect(next).toBeCalledWith(err);
    })

})