const { Console } = require('console');
const fs = require('fs');

function PageHienThiSP(res) {
    let data = fs.readFileSync('HTML/HienThiSP.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
  }
  function writeItemTable(obj, res) {
    res.write('<table class="table table-striped table-bordered table-list" border="1px solid black" style="margin-left:30px;width:80%;">');
    res.write('<thead> <tr><th>MaSP</th> <th>Ten SP</th><th style="width:auto;">So Luong</th> <th style="width:auto;">Chon </th>');
    if (obj.err) {
      res.write(`<h5 style="color:red;">Error:: ${obj.err}</h5>`);
      res.write('<tr><td colspan="5">Nothing to show</td></tr>');
    } else {
      if (obj.data.Items.length === 0) {
        res.write('<tr><td colspan="5">Nothing to show</td></tr>');
      }
      obj.data.Items.forEach((sanpham) => {
        res.write(`<tr>
        <td >${sanpham.maSanPham}</td>
        <td>${sanpham.TenSP}</td>
        <td>${sanpham.SoLuong}</td>
        <td><input name="SoLuong" type="checkbox" id="${sanpham.maSanPham}"/></td>`);
        res.write(`<td><a href="/delete?maSanPham=${sanpham.maSanPham}&TenSP=${sanpham.TenSP}">Xóa</a></td>
        </tr>`);  
      });
    }
    res.write('</table>' );
    res.end();
  }
  module.exports = {
    PageHienThiSP:PageHienThiSP,
    writeItemTable:writeItemTable
}