<template>
  <div class="booking-form-container " >
    <h1 class="text-3xl font-bold text-center mb-8 bg-slate-500 text-black rounded-r-lg">
      Mavistay Agency
    </h1>

    <form @submit.prevent="submitForm" class="p-6 bg-white rounded-lg shadow-lg">
      <div v-if="step === 1">
        <div class="mb-6">
          <label for="name" class="block text-sm font-bold text-gray-700">{{ $t('Full Name') }}</label>
          <InputText id="name" v-model="form.name" required class="w-full mt-1" />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-bold text-gray-700">{{ $t('Mobile Number') }}</label>
          <div class="flex space-x-2 rtl:space-x-reverse items-start">
            <AutoComplete v-model="form.countryCode" :suggestions="filteredCountryCodes" optionLabel="name"
              :forceSelection="false" :minLength="0" dropdown @complete="searchCountryCodes"
              @focus="triggerAllCountries" @dropdown-click="triggerAllCountries" :placeholder="$t('Select Country')"
              class="w-56">
              <template #option="{ option }">
                <div class="flex justify-between w-full">
                  <span>{{ option.name }}</span>
                  <span dir="ltr">{{ option.code }}</span>
                </div>
              </template>
            </AutoComplete>
            <InputText v-model="form.phone" :placeholder="$t('Mobile Number')"
              class="flex-1 p-3 border-gray-300 rounded-md" />
          </div>
        </div>

        <div class="mb-6">
          <label for="email" class="block text-sm font-bold text-gray-700">{{ $t('Email (optional)') }}</label>
          <InputText id="email" v-model="form.email" type="email" class="w-full mt-1" />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-bold text-gray-700">{{ $t('Destination') }}</label>
          <div class="mt-2 flex  gap-4">
            <div v-for="dest in destinationsOptions" :key="dest">
              <div class="flex items-center mx-4">
                <Checkbox :id="dest" v-model="form.destinations" :value="dest" class="mx-1" />
                <label :for="dest">{{ $t(dest) }}</label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <Button :label="$t('Next')" @click="step = 2" class="p-button-primary" />
        </div>
      </div>

      <div v-if="step === 2">
        <div class="mb-6">
          <label class="block text-sm font-bold text-gray-700 mb-2">{{ $t('Hotels') }}</label>
          <div class="flex gap-4">
            <Button :class="form.hotelChoice === 'اقترحوا فنادق' ? 'p-button-primary' : 'p-button-outlined'"
              :label="$t('Suggest Hotels')" @click="form.hotelChoice = 'اقترحوا فنادق'" />
            <Button :class="form.hotelChoice === 'لدي فندق محدد' ? 'p-button-primary' : 'p-button-outlined'"
              :label="$t('I have a hotel')" @click="form.hotelChoice = 'لدي فندق محدد'" />
          </div>
        </div>

<div v-if="form.hotelChoice === 'لدي فندق محدد'" class="mb-6">
          <label class="block text-sm font-bold text-gray-700">اختر الفنادق</label>
          <AutoComplete v-model="form.selectedHotels" :suggestions="filteredHotels" :multiple="true"
            :forceSelection="false" :minLength="0" dropdown @complete="searchHotels" @focus="triggerAllHotels"
            @dropdown-click="triggerAllHotels" @keyup.enter="addCustomHotel"
            :placeholder="$t('Find a hotel or write a new one')" class="w-full mt-1">
            <template #option="{ option }">
              <div class="flex items-center justify-between w-full">
                <span>{{ option.name }}</span>
              </div>
            </template>
            <template #chip="{ value }">
              <span class="px-2 py-1 rounded bg-gray-100">
                {{ typeof value === 'string' ? value : value.name }}
              </span>
            </template>
          </AutoComplete>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label for="arrival" class="block text-sm font-bold text-gray-700">{{ $t('Arrival Date') }}</label>
            <Calendar id="arrival" v-model="form.arrival" showIcon class="w-full mt-1" dateFormat="yy-mm-dd" />
          </div>
          <div>
            <label for="departure" class="block text-sm font-bold text-gray-700">{{ $t('Departure Date') }}</label>
            <Calendar id="departure" v-model="form.departure" showIcon class="w-full mt-1" dateFormat="yy-mm-dd" />
          </div>
        </div>

        <div class="flex justify-between">
          <Button :label="$t('Previous')" @click="step = 1" class="p-button-secondary" />
          <Button :label="$t('Next')" @click="step = 3" class="p-button-primary" />
        </div>
      </div>

      <div v-if="step === 3">
        <div class="flex gap-8 mb-6">
          <div>
            <label for="adults" class="block text-sm font-bold text-gray-700 text-center mx-auto">{{ $t('Number of adults') }}</label>
            <div class="flex items-center gap-1 mt-1">
              <button type="button"
                class="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white hover:bg-gray-700 transition-colors duration-200"
                @click="form.adults > 1 ? form.adults-- : null">
                -
              </button>
              <span class="text-xl font-semibold">{{ form.adults }}</span>
              <button type="button"
                class="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white hover:bg-gray-700 transition-colors duration-200"
                @click="form.adults++">
                +
              </button>
            </div>
          </div>
          <div>
            <label for="children" class="block text-sm font-bold text-gray-700 mx-auto text-center">{{ $t('Number of children') }}</label>
            <div class="flex items-center gap-1 mt-1">
              <button type="button"
                class="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white hover:bg-gray-700 transition-colors duration-200"
                @click="form.children > 0 ? form.children-- : null">
                -
              </button>
              <span class="text-xl font-semibold">{{ form.children }}</span>
              <button type="button"
                class="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white hover:bg-gray-700 transition-colors duration-200"
                @click="form.children++">
                +
              </button>
            </div>
          </div>
        </div>

        <div v-if="form.children > 0" class="mb-6">
          <label class="block text-sm font-bold text-gray-700">{{ $t('Age of children') }}</label>
          <div class="mt-2 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div v-for="i in form.children" :key="i" class="flex flex-col">
              <label :for="`childAge-${i}`" class="text-sm font-medium text-gray-600 mb-1">{{ $t('Child') }} {{ i
                }}</label>
              <input :id="`childAge-${i}`" type="number" v-model="form.childrenAges[i - 1]" :min="0" :max="17"
                class="w-16 p-1 border rounded-md text-center" />
            </div>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-bold text-gray-700">{{ $t('Additional services') }}</label>
          <div class="mt-2 grid grid-cols-2 sm:grid-cols-2 gap-4">
            <div v-for="service in servicesOptions" :key="service">
              <div class="flex items-center gap-1">
                <Checkbox :id="service" v-model="form.services" :value="service" class="mr-2" />
                <label :for="service">{{ $t(service) }}</label>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <label for="notes" class="block text-sm font-bold text-gray-700">{{ $t('Special notes or additional requests')
            }}</label>
          <Textarea id="notes" v-model="form.notes" rows="3" class="w-full mt-1" />
        </div>

        <div class="flex justify-between">
          <Button :label="$t('Previous')" @click="step = 2" class="p-button-secondary" />
          <Button type="submit" :loading="loading" :label="$t('Send the request')" class="p-button-primary" />
        </div>
      </div>

      <div v-if="step === 4" class="text-center mt-8">
        <div class="p-6 bg-green-100 text-green-800 rounded-lg">
          <i class="pi pi-check-circle text-5xl mb-4 text-green-600"></i>
          <p class="text-2xl font-bold mb-2">{{ $t('Thank you for your trust in us') }} 🎉</p>
          <p class="text-lg">{{ $t('Your order has been successfully received. Your order number is') }}: <span
              class="font-mono text-xl">{{ orderId }}</span></p>
          <p class="mt-4">{{ $t('We will contact you soon') }}</p>
        </div>
        <a :href="whatsappLink" target="_blank"
          class="inline-block mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition-colors">
          <i class="pi pi-whatsapp mr-2"></i> {{ $t('Contact via WhatsApp') }}
        </a>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import hotelsData from '~/data/hotels.json'
import countries from '~/data/countries.json'

const step = ref(1)
const orderId = ref('')
const loading = ref(false)
const hotels = ref([])

const destinationsOptions = [
  ('Istanbul'),
  ('Antalya'),
  ('Bodrum')
]
const servicesOptions = ['luxuryCar', 'yacht', 'airportTransfer', 'restaurantBooking']

const countryCodes = countries
const filteredCountryCodes = ref([])
const filteredHotels = ref([])

const form = reactive({
  name: '',
  countryCode: null,
  phone: '',
  email: '',
  destinations: [],
  hotelChoice: null,
  selectedHotels: [],
  arrival: null,
  departure: null,
  adults: 1,
  children: 0,
  childrenAges: [],
  services: [],
  notes: ''
})

/* إضافة فندق جديد */
const addCustomHotel = (event) => {
  const value = event.target.value?.trim()
  if (value && !form.selectedHotels.includes(value)) {
    form.selectedHotels.push(value)
  }
  event.target.value = ''
}

onMounted(() => {
  hotels.value = hotelsData
  const tr = countryCodes.find(c => c.code === '+90')
  if (tr) form.countryCode = tr
})

/* Autocomplete */
const triggerAllCountries = () => {
  filteredCountryCodes.value = countryCodes.slice(0, 100)
}
const searchCountryCodes = (event) => {
  const q = (event?.query || '').toLowerCase()
  if (!q) return triggerAllCountries()
  filteredCountryCodes.value = countryCodes.filter(c =>
    c.name.toLowerCase().includes(q) || (c.code || '').toLowerCase().includes(q)
  ).slice(0, 100)
}
const triggerAllHotels = () => {
  filteredHotels.value = hotels.value.slice(0, 100)
}
const searchHotels = (event) => {
  const q = (event?.query || '').toLowerCase()
  filteredHotels.value = hotels.value.filter(h =>
    (h.name || '').toLowerCase().includes(q)
  ).slice(0, 100)
}

/* ضبط أعمار الأطفال */
watch(() => form.children, (n) => {
  if (n < 0) n = 0
  form.childrenAges.length = n
})

/* واتساب */
const whatsappLink = computed(() => {
  const phone = "905540172222"
  const message = `مرحباً، لقد أرسلت حجزاً برقم الطلب ${orderId.value}.`
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
})

/* إرسال الطلب */
const submitForm = async () => {
  loading.value = true
  const scriptUrl = "https://script.google.com/macros/s/AKfycbyqzKurpz31vHzOGiyHJPQbY7xqFbi02uR93stTVdNTnuW0Xh4lSyG4enINNXPcPKy5/exec"

  try {
    const formData = new FormData()
    formData.append("secret", "xyz123")
    formData.append("name", form.name)
    formData.append("phone", `${form.countryCode?.dial_code || ''}${form.phone}`)
    formData.append("email", form.email)
    formData.append("destinations", (form.destinations || []).join(", "))
    formData.append("hotelChoice", form.hotelChoice || "")
    formData.append("selectedHotels", (form.selectedHotels || []).map(h => typeof h === 'string' ? h : h.name).join(", "))
    formData.append("arrival", form.arrival ? new Date(form.arrival).toISOString().split('T')[0] : '')
    formData.append("departure", form.departure ? new Date(form.departure).toISOString().split('T')[0] : '')
    formData.append("adults", form.adults)
    formData.append("children", form.children)
    formData.append("childrenAges", (form.childrenAges || []).join(", "))
    formData.append("services", (form.services || []).join(", "))
    formData.append("notes", form.notes)

    await fetch(scriptUrl, { method: "POST", mode: "no-cors", body: formData })

    orderId.value = 'ORD-' + Date.now()
    step.value = 4
  } catch (err) {
    console.error('Fetch Error:', err)
    orderId.value = 'ORD-' + Date.now()
    step.value = 4
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.booking-form-container {
  max-width: 800px;
  margin: 4rem auto;
  font-family: 'Arial', sans-serif;
}
</style>