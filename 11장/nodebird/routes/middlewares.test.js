const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

describe('isLoggedIn', ()=>{
    const next = jest.fn();// 몇번 호출되어 있는지 체크하는 기능이 있음
   
    const res = {
        status: jest.fn(()=>res),
        send:jest.fn()
    };
    
    test('로그인되어 있으면 isLoggedIn이 next를 호출하여야함', ()=>{
        const req = {
            isAuthenticated:jest.fn(()=>true)
        };

        isLoggedIn(req, res,next);
        expect(next).toBeCalledTimes(1);// 몇번 호출
    })
    
    
    test('로그인되어 있지 않으면 isLoggedIn이 에러를 호출하여야함', ()=>{
        // 하나의 테스트안에서 expect가 여러개 있는 경우는 다 만족을 해야 통과하는 것
        const req = {
            isAuthenticated:jest.fn(()=>false)
        };

        isLoggedIn(req, res, next)
        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalledWith('로그인 필요');
        
    })    
})


describe('isNotLoggedIn',()=>{

    const next = jest.fn();
    const res = {
        send:jest.fn(),
        redirect:jest.fn()
    };
    test('로그인되어 있으면 isNotLoggedIn이 에러를 호출하여야함', ()=>{
        const req ={
            isAuthenticated:jest.fn(()=>true)
        };
        isNotLoggedIn(req, res, next);
        const message = encodeURIComponent('로그인한 상태입니다.');
        expect(res.redirect).toBeCalledWith(`/?error=${message}`);
    })
    
    
    test('로그인되어 있지 않으면 isNotLoggedIn이 next를 호출하여야함', ()=>{
        const req ={
            isAuthenticated:jest.fn(()=>false)
        };
        isNotLoggedIn(req, res, next)
        expect(next).toBeCalledTimes(1);
    })
    
})
