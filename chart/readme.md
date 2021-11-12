*Thư viện cần thiết: 

        npm install d3

*Example: nằm trong App.js

*CustomChart props:

data: Một array mà các phần tử có định dạng sau:

    {
        type: string bao gồm "line", ("bar" và "scatterplot" => đang làm)
    
        color: string
    
        Y: Array Number
    
        X: Array String, bao gồm ngày tháng năm theo định dạng ISO ví dụ 2000-01-01T00:00:00.000Z
    
        xAxis: string bao gồm "bottom", "top", property này declare data này sẽ thuộc trục hoành nào
    
        yAxis: string bao gồm "left", "right", property này declare data này sẽ thuộc trục tung nào
    }
    

style: Một object có định dạng sau:    

    {
        padding {
            top: number
            left: number
            bottom: number
            right: number
           }
        axis: boole (true or false) property này declare có hiển thị trục hay không
    }
Lưu ý: Chart này sẽ lấy độ width và height của thẻ chứa nó ở componentDidMount, nhưng sẽ không tự động cập nhật width và height nếu kích thước container thay đổi
