var welcome = new Vue({ 
	el: '#start',
	data: {
		apartments: [],
		arriveDate: null,
		departDate: null,
		minPrice: "",
		maxPrice:"",
		disabledArriveDates: {
			to: new Date()
		},
		disabledDepartDates: {
			to:  new Date(2021, 0,1)
		}
	},
	mounted () {
        axios
          .get('rest/recappart')
          .then(response => (this.apartments = response.data))
	},
	methods:{
		calculateMark: function(apartment){
			var sum = 0;
			apartment.comments.forEach(element => {
				sum += element.reviewsMark;
			});
			return  (sum / apartment.comments.length);
		}
	},
	watch:{
		arriveDate: function(newDate, oldDate){
			var date = new Date();
			date.setDate(newDate.getDate());
			date.setMonth(newDate.getMonth());
			this.disabledDepartDates.to = new Date(date);
			console.log(newDate > this.departDate);
			if(this.departDate != null && newDate > this.departDate){
				this.departDate = date.setDate(date.getDate() +1);
			}
		},
		minPrice: function(newPrice, oldPrice){
			if(isNaN(newPrice)){
				this.minPrice = newPrice.substring(0,newPrice.length -1);
			}
		},
		maxPrice: function(newPrice, oldPrice){
			if(isNaN(newPrice)){
				this.maxPrice = newPrice.substring(0,newPrice.length -1);
			}
		},

	},
    components:{
		vuejsDatepicker
	}
});