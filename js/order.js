document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('order-btn').addEventListener('click', function (e) {
        e.preventDefault(); // Menghentikan aksi default dari tombol
        console.log("bisa")

        // Ambil token dari local storage
        const token = localStorage.getItem('token').replace(/['"]+/g, '');
        if (token === null) {
            if (confirm('Anda belum login!')) {
                window.location.replace("html/signIn.html")
            }
        }
        console.log(token)
        
        // Ambil data dari formulir
        const cartItem = document.getElementById('cartItem').value;
        const total = document.getElementById('total').value;
        const nama = document.querySelector('[name="nama"]').value;
        const alamat = document.querySelector('[name="alamat"]').value;
        const email = document.querySelector('[name="email"]').value;
        const hp = document.querySelector('[name="no-hp"]').value;
        const pengiriman = document.querySelector('[name="pengiriman"]').value;
        const gambar = document.querySelector('[name="gambar"]').value;
        console.log("cartItem" + "" + cartItem)
        console.log("pengiriman" + "" + pengiriman)

        // Buat objek data
        const data = {
            total_payment: total,
            address: alamat,
            payment_service: pengiriman,
            payment_proof: gambar,
        };

        // Kirim permintaan POST ke server
        fetch('https://be-jayapura-6-production.up.railway.app/api/order/add-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            })
        .then((response) => response.json())

        .then((data) => {
            console.log(data)
            if (data.success) {
                // Order berhasil
                alert('Order berhasil');
                // Contoh: Mengarahkan ke halaman order
                window.location.href = './html/order.html';
            } else {
                // Order gagal, tampilkan pesan kesalahan
                alert('Order gagal. Periksa kembali pesanan Anda.');
            }
        })
        .catch(function (error) {
            console.error(error);
        });
    });
});