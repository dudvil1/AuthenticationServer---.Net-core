// Function to generate XLSX content
function generateXLSXContent() {
    var content = '<?xml version="1.0"?>\n';
    content += '<?mso-application progid="Excel.Sheet"?>\n';
    content += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">\n';
    
    content += ' <Worksheet ss:Name="Sheet1">\n';
    content += '  <Table>\n';

    content += '   <Row>\n';
    content += '    <Cell><Data ss:Type="String">Test1</Data></Cell>\n';
    content += '    <Cell><Data ss:Type="String">Test2</Data></Cell>\n';
    content += '    <Cell><Data ss:Type="String">Test3</Data></Cell>\n';
    content += '   </Row>\n';

    content += '   <Row>\n';
    content += '    <Cell><Data ss:Type="String">Value1</Data></Cell>\n';
    content += '    <Cell><Data ss:Type="String">Value2</Data></Cell>\n';
    content += '    <Cell><Data ss:Type="String">Value3</Data></Cell>\n';
    content += '   </Row>\n';

    content += '  </Table>\n';
    content += ' </Worksheet>\n';

    content += '</Workbook>';

    return content;
}

// Function to download file
function downloadFile(blob, filename) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}

// Event listener for button click
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('generateBtn').addEventListener('click', function() {
        var data = generateXLSXContent();
        var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        downloadFile(blob, 'example.xlsx');
    });
});
