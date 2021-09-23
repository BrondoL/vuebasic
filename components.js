const Home = {
    template: `<div>Home</div>`,
};
const About = {
    template: `<div>About</div>`,
};

const Kelas = {
    template: `
            <div>
                <div class="row">
                    <div class="col-md-6">
                        <h3>Tambah kelas.</h3>
                        <form v-on:submit.prevent="submitkelas">
                            <div>
                                <input type="text" placeholder="Nama Kelas" v-model="kelas.judul"
                                        :class="{'is-invalid':error.judul.length, 'form-control':true}">
                                <div class="invalid-feedback" v-if="error.judul.length">
                                    {{ error.judul }}.
                                </div>
                            </div>
                            <div>
                                <label>Deksripsi</label><br>
                                <textarea v-model="kelas.deskripsi"
                                    :class="{'form-control':true, 'is-invalid':error.deskripsi.length}"></textarea>
                                <div class="invalid-feedback"
                                    v-if="error.deskripsi.length">
                                    {{ error.deskripsi }}.
                                </div>
                            </div>
                            <div>
                                <img :src="previewimg" v-if="previewimg" width="200">
                                <label v-if="!previewimg">Masukkan gambar</label><br>
                                <input type="file" v-on:change="upload" ref="image" :class="{'form-control':true}">
                            </div>
                            <button type="submit" class="btn btn-primary mt-3">Submit</button>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <h3 class="text-center">Daftar Kelas ({{ items.length }})</h3>
                        <template v-if="items.length > 0">
                            <div class="row">
                                <div class="col-6 mt-1" v-for="(val, i) of items">
                                    <div class="card">
                                        <img :src="'image/' + val.gambar" class="card-img-top" alt="gambar" height="200"
                                            style="object-fit: cover;">
                                        <div class="card-body">
                                            <h5>{{ i + 1 }}. {{ val.judul }}</h5>
                                            <a href="" @click.prevent="$emit('hapuskelas', val.id)">hapus</a> |
                                            <router-link :to="'/kelas/' + val.id">detail</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <li v-else>Kelas belum tersedia.</li>
                    </div>
                </div>
            </div>`,
    data: function () {
        return {
            kelas: {
                judul: "",
                deskripsi: "",
                gambar: "",
            },
            previewimg: "",
            error: {
                judul: "",
                deskripsi: "",
                gambar: "",
            },
        };
    },
    props: ["items"],
    methods: {
        submitkelas: function () {
            if (!this.kelas.judul.length) {
                this.error.judul = "Judul is required";
                console.log(this.error.judul);
            } else {
                this.error.judul = "";
            }
            if (!this.kelas.deskripsi.length) {
                this.error.deskripsi = "Deskripsi is required";
                console.log(this.error.deskripsi);
            } else {
                this.error.deskripsi = "";
            }

            const data = {
                id: uuidv4(),
                judul: this.kelas.judul,
                deskripsi: this.kelas.deskripsi,
                gambar: this.kelas.gambar,
            };
            this.$emit("submitkelas", data);
            this.kelas.judul = "";
            this.kelas.deskripsi = "";
            this.kelas.gambar = "";
            this.previewimg = "";
            this.$refs.image.value = "";
        },
        upload: function (e) {
            this.kelas.gambar = e.target.files[0].name;
            this.previewimg = URL.createObjectURL(e.target.files[0]);
        },
    },
};

const detailKelas = {
    template: `
            <div>
                <template v-if="detailKelas">
                    <img :src="url_gambar(detailKelas.gambar)" class="img-thumbnail" alt="gambar" width="500">
                    <h3>{{ detailKelas.judul }}</h3>
                    <p>{{ detailKelas.deskripsi }}</p>
                </template>
                <p v-else>Kelas tidak tersedia</p>
            </div>`,
    data() {
        return {
            detailKelas: {},
        };
    },
    created() {
        this.filterKelas();
    },
    methods: {
        filterKelas: function () {
            let id = this.$route.params.id;
            let kelasDetailRef = db.ref("kelas/" + id);
            kelasDetailRef.on("value", (item) => {
                this.detailKelas = item.val();
            });
        },
        url_gambar: function (gambar) {
            return gambar ? "../image/" + gambar : "";
        },
    },
};

const NotFound = {
    template: `<div>Halaman tidak ditemukan</div>`,
};

Vue.component("header-component", {
    template: `
            <header class="text-center">
                <img v-bind:src="gambar" class="img-thumbnail rounded-circle" alt="logo" width="300"
                    loading="lazy">
                <p>{{ pesan }}</p>
            </header>`,
    data: function () {
        return {
            pesan: "Welcome to Progressive JavaScript Framework",
        };
    },
    props: ["gambar"],
});

Vue.component("footer-component", {
    template: `<footer id=" footer" class="text-center mt-5">
                <p>copyright 2021</p>
            </footer>`,
});
